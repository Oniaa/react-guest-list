import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    const fetchGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
    };

    fetchGuests().catch((error) => {
      console.error(error);
    });
  }, []);

  /*  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuests(allGuests);
  } */

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
      /* const newGuest = {
        firstName: firstName,
        lastName: lastName,
      }; */
      // setGuests([...guests, newGuest]);
      await addNewGuest();
      // await addNewGuest([...guests, guests]);
      // setGuests([...guests, newGuest]);
      setFirstName('');
      setLastName('');
    }
  }

  /*  async function deleteGuest() {
    const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
    const deletedGuest = await response.json();
    setGuests([...guests, deletedGuest]);
  } */

  /*  async function deleteGuest() {
    const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
    const deletedGuest = await response.json();
    setGuests([...guests, deletedGuest]);
  }
  deleteGuest().catch((error) => {
    console.error(error);
  });  */

  /* async function handleRemoveGuest(index) {
    const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
    const deletedGuest = await response.json();
    setGuests([...guests, deletedGuest]);
    const newGuest = [...guests];
    newGuest.splice(index, 1);
    setGuests(newGuest);
  } */

  /*  function handleRemoveGuest(index) {
    const newGuest = [...guests];
    newGuest.splice(index, 1);
    setGuests(newGuest);
  }  */

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
