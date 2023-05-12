import React, { useState } from 'react';

export default function AddGuest(props) {
  /* const guestForm = {
    id: null,
    firstName: '',
    lastName: '',
  }; */

  const baseUrl = 'http://localhost:4000';

  const [guest, setGuest] = useState('guestForm');

  /* async function addNewGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: '', lastName: '' }),
    });
    const createdGuest = await response.json();

    setGuest([...guest, createdGuest.results]);
  } */

  function handleInputChange(event) {
    const { name, value } = event.currentTarget.value;

    setGuest({ ...guest, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.addGuest(guest);
    setGuest(guestForm);
    // await addNewGuest();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First name
        <input
          name="firstName"
          value={guest.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Last name
        <input
          name="lastName"
          value={guest.lastName}
          onChange={handleInputChange}
        />
      </label>
      <button>Add</button>
    </form>
  );
}
