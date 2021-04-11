// Instead of passing values from App to Sidebar to Modal and vice versa we create a Context

import React, { useContext } from 'react'
import useLocalStorage from '../components/hooks/useLocalStorage';

const ContactsContext = React.createContext();

export function useContacts(){
    return useContext(ContactsContext)
}



export  function ContactsProvider({  children  }) {
    const [contacts, setContacts] = useLocalStorage('contacts', [])
    
    function createContact(id, name){
        setContacts(prevContacts => {
            return [...prevContacts, { id, name }]
        })


    }
    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
                {children}
        </ContactsContext.Provider>           
    )
}
