import React from 'react';
import './App.css';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>💃🍔The 5th Annual Bob's Burgers Ball!🍔🤵‍</h1>
        <img src="https://66.media.tumblr.com/ea714643037906db0da2324374c6017d/tumblr_ohdffpMZGT1udklowo1_540.gifv"></img>
        <p>When: Saturday, December 19, 2020</p>
        <p>Where: Bob's Burgers, </p>

        <h2>RSVP Below!</h2>
      </div>
      <Form />
    </div>
  );
}

export default App;
