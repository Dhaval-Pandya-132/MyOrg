// Instead of passing values from App to Sidebar to Modal and vice versa we create a Context

import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../components/hooks/useLocalStorage';
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const { contacts } = useContacts()
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const socket = useSocket()



  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
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
            return newConversations
        }
        // get previous conversation
        else {
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
    console.log("something!!!!")
    let socket1 = socket.connect();
    console.log('check 1', socket1.connected);
    socket1.on('connect', function() {
      console.log('check 2', socket1.connected);
    });
    addMessageToConversation({ recipients, text, sender: id })
  }



  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
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