import React, { useState, useEffect } from 'react';
import './App.css';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value.trim());
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function App() {
    const [message, setMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const debouncedMessage = useDebounce(message, 500);

    useEffect(() => {
        async function fetchMovies() {
            if (!debouncedMessage) {
                setSuggestions([]);
                return;
            }

            // Fetch broader results, perhaps based on the first word or initial characters
            const query = debouncedMessage.split(' ')[0]; // Simplistic approach: Use the first word for fetching
            const apiUrl = `http://www.omdbapi.com/?apikey=452caf0c&s=${encodeURIComponent(query)}&type=movie`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.Search) {
                    // Perform a custom filtering on the fetched results
                    const filteredSuggestions = data.Search.filter(movie => 
                        movie.Title.toLowerCase().includes(debouncedMessage.toLowerCase())
                    ).map(movie => movie.Title);
                    setSuggestions(filteredSuggestions.length ? filteredSuggestions : ['No direct matches, try refining your search.']);
                } else {
                    setSuggestions(['No movies found. Try another search.']);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setSuggestions([]);
            }
        }

        fetchMovies();
    }, [debouncedMessage]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSuggestionClick = (value) => {
        setMessage(value);
        setSuggestions([]);
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            console.log('Sending message:', message);
            setMessage('');
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
