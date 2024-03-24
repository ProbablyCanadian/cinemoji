import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [message, setMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const autocompleteRef = useRef(null);

    // Sample list of movies for autocomplete suggestions
    const movies = ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "The Godfather Part II", "12 Angry Men"];

    const handleInputChange = (event) => {
        const userInput = event.target.value;
        setMessage(userInput);
        if (!userInput) {
            setSuggestions([]);
        } else {
            const filteredSuggestions = movies.filter(movie =>
                movie.toLowerCase().startsWith(userInput.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
    };

    const handleSuggestionClick = (value) => {
        setMessage(value);
        setSuggestions([]);
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            //Add stuff when you click the button
            //setMessage('');
        } else {
            alert('Please enter a message.');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [autocompleteRef]);

    return (
        <div className="App">
            <header className="App-header">
                <h2>CineMoji 🎬</h2>
                <h3>Movie Name</h3>
                <div className="autocomplete" ref={autocompleteRef}>
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
