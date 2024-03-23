import './App.css';
/*
import React, { useState } from "react";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

function App() {
  const handleChange = (event) => {
    console.log(event.target.value); // Access the value entered by the user
  };
  return (
    
    <div classname ="App">
      <header className="App-header">
      

      test i will kms if this doesnt work
      
        <div>
          <label htmlFor="textbox">Enter text:</label>
          <input
          type="text"
          id="textbox"
          onChange={handleChange} // Handle change event
          placeholder="Type here..."
          />
        </div>
      </header>
    </div>
  );
}

export default App;
*/

import React, { useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            alert('Message sent: ' + message); // You can replace this with your desired action to send the message
            setMessage('');
        } else {
            alert('Please enter a message.');
        }
    };

    return (
      <div classname ="App">
          <header className="App-header">
                    <h2>CineMoji 🎬</h2>
                    <h3>Movie Name</h3>
                    <input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your guess here..."
                    />
                    <button onClick={sendMessage}>Send</button>
            </header>
        </div>
    );
}

export default App;