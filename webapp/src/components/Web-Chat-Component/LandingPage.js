import React, { useState, useEffect } from 'react';
// import './App.scss';
import Login1 from '../Login-Chat-App/Login1'
// import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard1 from '../Dashboard/Dashboard1';
import { ContactsProvider } from '../../contexts/ContactsProvider';
import { ConversationProvider } from '../../contexts/ConversationProvider';
import { SocketProvider } from '../../contexts/SocketProvider';
import Cookies from 'js-cookie'
import ChatService from '../../services/saveconvo.service';

function  LandingPage() {
  
  
 const fetchUser = async () => { 
  const tokenId = Cookies.get('tokenId');
  console.log("tokenId", tokenId)
  const res = await fetch('http://localhost:8081/user', {
   method: 'GET',
   headers:{
     'tokenId': tokenId
   },
  })

  const data = await res.json()
  return data
} 

  const [id, setId] = useState(); // useLocalStorage('id');
  
  const [user, setUser] = useState();



  useEffect(() => {
    let mounted = true;
    ChatService.getUser(Cookies.get('tokenId'))  // fetchUser()
      .then(items => {
        if(mounted) {
          setId(items.email);
          setUser(items);
        }
      })
    return () => mounted = false;
  }, [])

 /*
  useEffect(() => {
    const user =  fetchUser()
    console.log("id1", user)
    setId([user.email])
  }, [])

 
  const id1 =  async() => {
    const user = await fetchUser()
    console.log("id1", user[0])
    return user[0]
  
  } */

  const dashboard = (
    <SocketProvider  id={id}>
      <ContactsProvider id={id} >
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
