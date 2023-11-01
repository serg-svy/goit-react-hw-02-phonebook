import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Theme, TitleForm, TitleContact } from './App.styled';
import contactData from '../src/contactData.json';

export default class App extends Component {
  state = {
    contacts: contactData,
    filter: '',
  };
  onAddContact = newContact => {
    console.log(newContact);
    const hasNameContact = this.state.contacts.some(
      contact => contact.name === newContact.name
    );

    if (hasNameContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    });
  };
  onDeleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };
  onInputContact = event => {
    const searchContact = event.target.value.toLowerCase();
    this.setState({ filter: searchContact });
  };

  findContact = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
  };

  render() {
    const filteredContacts = this.findContact();
    return (
      <Theme>
        <TitleForm>Phonebook</TitleForm>
        <ContactForm onAddContact={this.onAddContact} />
        <TitleContact>Contacts</TitleContact>
        <Filter
          filter={this.state.filter}
          onInputContact={this.onInputContact}
        />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.onDeleteContact}
        />
      </Theme>
    );
  }
}
