// Instead of passing values from App to Sidebar to Modal and vice versa we create a Context
import Cookies from 'js-cookie'
import React, { useContext, useState, useEffect, useCallback } from 'react'
// import useLocalStorage from '../components/hooks/useLocalStorage';
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationProvider({ id, children }) {
  const [conversations, setConversations] = useState([]); // useLocalStorage('conversations', []); //useState([]);  // useLocalStorage('conversations', []);
  const { contacts } = useContacts()
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const socket = useSocket()




  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
     //   console.log('conversationProvider', contact.id)
        return contact.id === recipient
      })
      const name =  (contact && contact.userName) || recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages.map(message => {
        const contact = contacts.find(contact => {
          return contact.id === message.sender
        })
        const name = (contact && contact.name) || message.sender
        const fromMe = id === message.sender
        return { ...message, senderName: name, fromMe }
    })


    const selected = index === selectedConversationIndex
    return { ...conversation, messages,  recipients, selected }
  })



















//  APIs
useEffect(() => {
    let mounted = true;
    fetchUsersConvo()
      .then(items => { 
        if(mounted) {
          if(items){
            // If conversation present
            console.log('My Conversation', items.conversations)
            setConversations(items.conversations);
          } else {
            // If conversation not present
            console.log('creating convo doc')
            createConversationDoc() 
          }
       //   setConversations(items.conversations);
        }
      })
    return () => mounted = false;
  }, [])


const fetchUsersConvo = async () => { 
    const tokenId = Cookies.get('tokenId');
    const res = await fetch(`http://localhost:8081/mymessages/${id}`, {
//   const res = await fetch(`http://localhost:8081/mymessages/`, {
        method: 'GET',
        headers:{
        'tokenId': tokenId
        },
    })
    const data = await res.json()
    return data
    } 

  const createConversationDoc = async () => { 
      const tokenId = Cookies.get('tokenId');
      const res = await fetch(`http://localhost:8081/mymessages/`, {
          method: 'POST',
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'tokenId': tokenId
          },
          body: JSON.stringify({
              userEmail: id,
              conversations: []
          })
      })
      const data = await res.json()
      return data
      } 


      const newConversationPut = async (newConversations) => { 
        const tokenId = Cookies.get('tokenId');
        const res = await fetch(`http://localhost:8081/mymessages/${id}`, {
            method: 'PUT',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'tokenId': tokenId
            },
            body: JSON.stringify({
                userEmail: id,
                conversations: newConversations
            })
        })
        const data = await res.json()
        return data
        } 




  function createConversation(recipients) {
    console.log('formatted convo : ')
    let flag = false;
    console.log(formattedConversations)
    let conv = formattedConversations.map(conv=> conv.recipients.map( rec => rec.id))
    console.log("con",conv)
    for(let i = 0; i  < conv.length; i++){
      console.log("create convo conversation ")
      console.log(conv[i])
      console.log("create convo recipients ")
      console.log(recipients)
     
      flag =  arrayEquality(conv[i], recipients)

        if(flag)
          break;


    }


    if(!flag)
          setConversations(prevConversations => { return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {

    // Get previous conversations
    setConversations(prevConversations => {
        
        let madeChange = false
        const newMessage = { sender, text }
        const newConversations = prevConversations.map(
            conversation => {
                if(arrayEquality(conversation.recipients, recipients)){

                    madeChange = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage ]
                    }
                }

                return conversation

            })
        
        
        
        // Its a new conversation
        if(madeChange){

            // console.log('New Conversations : ');
            // console.log(newConversations);
            // // const messages = newConversations[0].messages;
            // const recipients = newConversations[0].recipients;
            // console.log(messages);
            // console.log(recipients);

            // PUT method

            newConversationPut(newConversations);

            return newConversations
        }
        // get previous conversation
        else {

          const conversationsObj = {
            recipients: recipients,
            messages: newMessage
          }



          console.log('prevConversations', prevConversations)

          console.log('New Message', newMessage)

          newConversationPut(conversationsObj);


          return [
                ...prevConversations, 
                { recipients, messages: [newMessage] }
            ]
        }

    })
    
    }, [setConversations])

 


  useEffect(() => {
    if(socket == null){ 
      return
    }
    socket.on('recieve-message', addMessageToConversation)

    return () => socket.off('recieve-message')
  }, [socket, addMessageToConversation]) 


  function sendMessage(recipients, text){
    socket.emit('send-message', { recipients, text })

    

    addMessageToConversation({ recipients, text, sender: id })
  }




  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations
    [selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    sendMessage,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children} 
    </ConversationsContext.Provider>
  )
}


function arrayEquality(a, b){
    if(a.length !== b.length) return false;

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}