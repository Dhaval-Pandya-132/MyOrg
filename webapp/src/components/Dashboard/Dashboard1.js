import React from 'react'
import OpenConversation from '../Web-Chat-Component/OpenConversation'
import Sidebar from '../Web-Chat-Component/Sidebar'
import './Dashboard1.scss'
import { useConversations } from '../../contexts/ConversationProvider'


export default function Dashboard1({ id }) {
    const { selectedConversation } = useConversations()
   
    return (

        <div className='dash-div'>
            <Sidebar id={id} />
            {selectedConversation && <OpenConversation />}
        </div>
            
    )
}
