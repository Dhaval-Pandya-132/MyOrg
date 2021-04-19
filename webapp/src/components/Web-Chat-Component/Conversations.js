import React, { useContext, useState, useEffect, useCallback }  from 'react'
import Cookies from 'js-cookie'
//import React, { useContext, useState, useEffect, useCallback } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../../contexts/ConversationProvider'
import ChatService from '../../services/saveconvo.service'
export default function Conversations() {

    const { conversations, selectConversationIndex } = useConversations()
    let contacts = []

    useEffect(() => {
      let mounted = true;
      ChatService.getUsers(Cookies.get('tokenId')) // fetchUsers()
        .then(items => {
          if(mounted) {
            console.log('contacts in conversation component', items)
            contacts = items
          }
        })
      return () => mounted = false;
    }, [])




    
    return (
      <ListGroup variant="flush">
        {conversations.map((conversation, index) => (
          <ListGroup.Item 
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
            > 
            {conversation.recipients.map(r =>  
                r.name
            ).join(', ')
            }

          </ListGroup.Item>
        ))}
      </ListGroup>
    )
}

function getRecipientName(contacts, email ) {

  for(let i = 0; i < contacts.length; i++){
    console.log('getRecipientName function ')
      console.log(contacts[i])
      if(contacts[i].email === email){
        console.log('contacts: ')
        console.log(contacts[i])
        return contacts[i].userName;
      }

  }



}