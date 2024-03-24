    import React, { useState } from 'react';
    import './App.css';

    function App() {
        const [message, setMessage] = useState('');
        const [suggestions, setSuggestions] = useState([]);

        const handleInputChange = async (event) => {
            const userInput = event.target.value;
            setMessage(userInput);
        
            // Check if the userInput is not just whitespace before fetching
            if (userInput.trim()) {
                // Replace 'YOUR_API_KEY_HERE' with your actual OMDb API key
                const apiUrl = `http://www.omdbapi.com/?apikey=452caf0c&type=movie&s=${encodeURIComponent(userInput.trim())}`;

        
                try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.Search) {
                        setSuggestions(data.Search.map(movie => movie.Title));
                    } else {
                        setSuggestions([]);
                    }
                } catch (error) {
                    console.error("Could not fetch movie data:", error);
                    setSuggestions([]);
                }
            } else {
                // Optionally, keep suggestions as is, instead of clearing them, when the user types only spaces
                // setSuggestions([]);
            }
        };

        const handleSuggestionClick = (value) => {
            setMessage(value);
            setSuggestions([]);
        };

        const sendMessage = () => {
            if (message.trim() !== '') {
                console.log('Sending message:', message);
                // Implement your logic to "send" the message here
                // This could be setting the message to some state, sending it to a backend, etc.
                setMessage(''); // Clearing the input field after sending the message
            } else {
                alert('Please enter a message.');
            }
        };

        return (
            <div className="App">
                <header className="App-header">
                    <h2>CineMoji 🎬</h2>
                    <h3>Movie Name</h3>
                    <div className="autocomplete">
                        <input
                            type="text"
                            value={message}
                            onChange={handleInputChange}
                            placeholder="Type your guess here..."
                        />
                        {suggestions.length > 0 && (
                            <div className="autocomplete-items">
                                {suggestions.map((suggestion, index) => (
                                    <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={sendMessage}>Send</button>
                </header>
            </div>
        );
    }

    export default App;
