import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import {uuid} from uuid;
import { v4 as uuid } from 'uuid';

function App() {
  const LOCAL_STORAGE_KEY= "contact";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts,{id: uuid(), ...contact}]);
  }

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    console.log(typeof(retrieveContacts));
    if(retrieveContacts) setContacts(retrieveContacts);
    console.log(contacts);
  }, []);

  const removeContactHandler = (id) =>{
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  }, [contacts]);

  return (
   <div className='ui container'> 
     <Header/>
     <AddContact addContactHandler={addContactHandler}/>
     <ContactList contacts={contacts} getContactId={removeContactHandler}/>
   </div>
  );
}

export default App;
