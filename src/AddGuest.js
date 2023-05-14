/* import React, { useState } from 'react';

export default function AddGuest() {
   const guestForm = {
    id: null,
    firstName: '',
    lastName: '',
  };

  const baseUrl = 'http://localhost:4000';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guest, setGuest] = useState([
    {
      firstName: '',
      lastName: '',
    },
  ]);

  async function addNewGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();

    setGuest([...guest, createdGuest.results]);
  }

   function handleInputChange(event) {
    const { name, value } = event.currentTarget.value;

    setGuest({ ...guest, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await addNewGuest();

    // setGuest(guestForm);
    // await addNewGuest();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First name
        <input
          name="firstName"
          value={guest.firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Last name
        <input
          name="lastName"
          value={guest.lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <button>Add</button>
    </form>
  );
}

 */
