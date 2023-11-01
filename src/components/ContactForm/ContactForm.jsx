import React, { Component } from 'react';
import {
  Form,
  MarkField,
  ContactName,
  ContactNumber,
  BtnAdd,
} from './ContactForm.styled';
import { nanoid } from 'nanoid';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    id: '',
  };
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };
    this.props.onAddContact(newContact);

    this.setState({
      name: '',
      number: '',
      id: '',
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <MarkField>Name</MarkField>
          <ContactName
            onChange={this.handleInputChange}
            type="text"
            name="name"
            value={this.state.name}
            required
          />
          <MarkField>Number</MarkField>
          <ContactNumber
            onChange={this.handleInputChange}
            type="tel"
            name="number"
            value={this.state.number}
            required
          />
          <BtnAdd type="submit">Add contact</BtnAdd>
        </Form>
      </div>
    );
  }
}

// import { Component } from 'react';

// export class ContactForm extends Component {
//   state = {};
//   render() {
//     return (
//       <form action="">
//         <label for="exampleInputEmail1" class="form-label">
//           Email address
//         </label>
//         <input
//           type="text"
//           name="name"
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//         />
//         <button type="submit" class="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     );
//   }
// }
