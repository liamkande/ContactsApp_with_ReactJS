import React, { Component }from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }
updateQuery = (query) => {
  this.setState(() => ({
    query: query.trim()
  }))
}

clearQuery = () => this.updateQuery('')

  render() {
    // Destructor
    const { query } = this.state
    const { contacts, onDeleteContact } = this.props

    const showingcontacts = query === ''
    ? contacts
    : contacts.filter((c) => (
      c.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input className='search-contacts'
                 type='text'
                 placeholder='Search-contacts'
                 value={query}
                 onChange={(event) => this.updateQuery(event.target.value)}
           />
           <Link to='/create'
              className='add-contact'
             >Add Contact</Link>
        </div>

        {
          // if you never seen && its called the guard up Operator all it does
          // is the following code will only execute if the previous condition
          // is true
          showingcontacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingcontacts.length} of {
              contacts.length}</span>
              <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingcontacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar'
                   style={{
                     backgroundImage: `url(${contact.avatarURL})`
                   }}
                   ></div>
                   <div className='contact-details'>
                     <p>{contact.name}</p>
                     <p>{contact.handle}</p>
                   </div>
                   <button className='contact-remove'
                           onClick={() => onDeleteContact(contact)}
                     >
                     Remove
                   </button>
            </li>
          ))}
        </ol>
      </div>

    )
  }
}

export default ListContacts
