import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
    }

    fetchGuests().catch((error) => {
      console.error(error);
    });
  }, []);

  async function addNewGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
    setGuests([...guests, createdGuest]);
    console.log(guests);
  }

  function handleFirstNameChange(event) {
    setFirstName(event.currentTarget.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.currentTarget.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      await addNewGuest();
      setFirstName('');
      setLastName('');
    }
  }

  function handleRemoveGuest(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      const currentGuest = [...guests];
      const newGuest = currentGuest.filter(
        (guest) => guest.id !== deletedGuest.id,
      );
      setGuests(newGuest);
    }
    deleteGuest().catch((error) => {
      console.error(error);
    });
  }

  function handleAttendingChange(index, attending) {
    const newCheckboxes = [...guests];
    newCheckboxes[index].attending = attending;
    setGuests(newCheckboxes);
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
          {guests.map((guest, index) => (
            <div key={`guest-profile-${guest.id}`}>
              <p>
                {guest.firstName} {guest.lastName},{' '}
                {guest.attending ? 'attending' : 'not attending'}
              </p>
              <input
                aria-label="attending"
                checked={guest.attending}
                type="checkbox"
                onChange={(event) => (index, event.currentTarget.checked)}
              />
              <button onClick={() => handleRemoveGuest(guest.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
