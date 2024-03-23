import './App.css';
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
            //Add stuff when you click the button
            //setMessage('');
        } else {
            alert('Please enter a message.');
        }
    };

    return (
        <div className="App">
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
