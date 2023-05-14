import './App.css';
import { useState } from 'react';

// import AddGuest from './AddGuest';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleFirstNameChange(event) {
    setFirstName(event.currentTarget.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.currentTarget.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (firstName !== '' && lastName !== '') {
      setGuests([...guests, { firstName, lastName }]);
      setFirstName('');
      setLastName('');
    }
  }

  return (
    <div className="App" data-test-id="guest">
      <h1>GUEST LIST</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            First name :
            <input
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </label>
          <label>
            Last name
            <input
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </label>
          <button>Add</button>
        </form>
        <br />
      </div>
      {guests.length > 0 && (
        <div>
          <h2>Guests</h2>
          {guests.map((guest) => (
            <div key={`guest-profile-${guest}`}>
              <p>
                {guest.firstName} {guest.lastName}
              </p>
              <button
                onClick={() => {
                  const newGuest = [...guests];
                  newGuest.length = newGuest.length - 1;
                  setGuests(newGuest);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
