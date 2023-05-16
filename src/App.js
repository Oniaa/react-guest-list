import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);

  const baseUrl = 'http://localhost:4000';

  // Fetches all submitted Guests from the API on first render
  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
      setLoading(false);
    }

    fetchGuests().catch((error) => {
      console.error(error);
    });
  }, []);

  // Adds new Guest to the API and puts the createdGuest in a copy of the guests array
  async function addNewGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
    setGuests([...guests, createdGuest]);
  }

  // Lets User enter First and Last Name in the input
  function handleFirstNameChange(event) {
    setFirstName(event.currentTarget.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.currentTarget.value);
  }

  // If the Input field is not empty => uses the addNewGuest function to submit the new Guest
  // and sets the First Name and Last Name input fields to empty again
  async function handleSubmit(event) {
    event.preventDefault();
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      await addNewGuest();
      setFirstName('');
      setLastName('');
    }
  }

  // Deletes the Guest from the Screen and the API by making a copy of guest and storing it in currentGuests
  // filtering through the currentGuests
  // finding the guest.id that doesnt match the deletedGuest.id and storing them in nonDeletedGuest
  function handleRemoveGuest(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      const currentGuests = [...guests];
      const nonDeletedGuest = currentGuests.filter(
        (guest) => guest.id !== deletedGuest.id,
      );
      setGuests(nonDeletedGuest);
    }
    deleteGuest().catch((error) => {
      console.error(error);
    });
  }

  // Updates the guests attending status in API and Screen
  // Creates copy of guests and storing it in currentGuestsStatus filtering through it
  // finding guest that id doesnt match the updatedGuest.id
  // setting guests to the oldGuestStatus and the updatedGuestStatus so it still shows all the guests
  async function handleAttendingStatus(id, attending) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !attending }),
    });
    const updatedGuest = await response.json();
    const currentGuestsStatus = [...guests];
    const oldGuestStatus = currentGuestsStatus.filter(
      (guest) => guest.id !== updatedGuest.id,
    );
    setGuests([...oldGuestStatus, updatedGuest]);
    console.log(guests);
  }

  if (loading) {
    return <div>Loading...</div>;
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
          {guests.map((guest) => (
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
                  handleAttendingStatus(
                    guest.id,
                    guest.attending,
                    event.currentTarget.checked,
                  )
                }
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
