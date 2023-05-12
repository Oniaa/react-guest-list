import './App.css';
import { useState } from 'react';
import AddGuest from './AddGuest';

export default function App() {
  const [guests, setGuests] = useState([]);

  const guestForm = {
    id: null,
    firstName: '',
    lastName: '',
  };

  function addGuest(guest) {
    guest.id = guests.length + 1;
    setGuests([...guests, guest]);
  }

  return (
    <div className="App" data-test-id="guest">
      <h1>GUEST LIST</h1>
      <div>
        <h2>Add new Guest</h2>
        <AddGuest addGuest={addGuest} />
      </div>
    </div>
  );
}
