import React, { useState } from 'react';
// import './App.scss';
import Login1 from '../Login-Chat-App/Login1'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard1 from '../Dashboard/Dashboard1';
import { ContactsProvider } from '../../contexts/ContactsProvider';
import { ConversationProvider } from '../../contexts/ConversationProvider';
import { SocketProvider } from '../../contexts/SocketProvider';


function  LandingPage() {
  
  // Keeping the data persisted on local 
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    // Wrapping the Dashboard1 in ContactsProvider and rendering it
    
    <SocketProvider  id={id}>
      <ContactsProvider>
        <ConversationProvider  id={id}>
            <Dashboard1 id={id} />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login1 onIdSubmit={setId} />
  ) 
}

export default LandingPage;
