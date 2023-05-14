import './App.css';
import { useRef, useState } from 'react';

// import AddGuest from './AddGuest';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const baseUrl = 'http://localhost:4000';

  const lastNameInputRef = useRef(null);

  async function newGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: guests.firstName,
        lastName: guests.lastName,
      }),
    });
    const createdGuest = await response.json();
    setGuests([...guests, createdGuest]);
  }

  function handleFirstNameChange(event) {
    setFirstName(event.currentTarget.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.currentTarget.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (firstName !== '' && lastName !== '') {
      setGuests([...guests, { firstName, lastName, attending: false }]);
      setFirstName('');
      setLastName('');
    }
  }

  function handleRemoveGuest(index) {
    const newGuest = [...guests];
    newGuest.splice(index, 1);
    setGuests(newGuest);
  }

  function handleAttendingChange(index, attending) {
    const newCheckboxes = [...guests];
    newCheckboxes[index].attending = attending;
    setGuests(newCheckboxes);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      lastNameInputRef.current.focus();
    }
  }

  return (
    <div className="App" data-test-id="guest">
      <h1>GUEST LIST</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            First name
            <input
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              onKeyDown={handleKeyPress}
            />
          </label>
          <label>
            Last name
            <input
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              ref={lastNameInputRef}
            />
          </label>
          <button>Add</button>
        </form>
        <br />
      </div>
      {guests.length > 0 && (
        <div>
          <h2>Guests</h2>
          {guests.map((guest, index) => (
            <div key={`guest-profile-${guest}`}>
              <p>
                {guest.firstName} {guest.lastName},{' '}
                {guest.attending ? 'attending' : 'not attending'}
              </p>
              <input
                aria-label="attending"
                checked={guest.attending}
                type="checkbox"
                onChange={(event) =>
                  handleAttendingChange(index, event.currentTarget.checked)
                }
              />
              <button onClick={() => handleRemoveGuest(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
