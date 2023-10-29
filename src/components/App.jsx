import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = e => {
    e.preventDefault();
    const nameInput = e.target.elements.name.value;
    const numberInput = e.target.elements.number.value;

    const isContactExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === nameInput.toLowerCase()
    );

    if (isContactExist) {
      alert(`${nameInput} is already in contacts`);
    } else {
      const contact = {
        name: nameInput,
        number: numberInput,
        id: nanoid(),
      };

      this.setState(state => {
        return { contacts: [...state.contacts, contact] };
      });
    }

    e.target.reset();
  };

  removeContact = e => {
    if (e.target.nodeName === 'BUTTON') {
      const contactName = e.currentTarget.getAttribute('name');
      return this.setState({
        contacts: this.state.contacts.filter(
          contact => contact.name !== contactName
        ),
      });
    }
  };

  handleFilterInput = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <div style={{ margin: '20px 0 0 20px' }}>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter handleInput={this.handleFilterInput} />
        <ContactList
          contacts={this.state.contacts}
          filterState={this.state.filter}
          handleBtnClick={this.removeContact}
        />
      </div>
    );
  }
}
