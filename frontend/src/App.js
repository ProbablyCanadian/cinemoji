import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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

// Placeholder Home component, you can adjust it as needed
function Home() {
  return <h2>Welcome to CineMoji 🎬</h2>;
}

// Assuming TVShows is another component you have or will create
function TVShows() {
  return <h2>TV Shows</h2>;
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

      const query = debouncedMessage.split(' ')[0];
      const apiUrl = `http://www.omdbapi.com/?apikey=452caf0c&s=${encodeURIComponent(query)}&type=movie`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.Search) {
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
    <Router>
      <div className="App">
        <aside className="App-sidebar">
          {/* Links for navigation */}
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tvshows">TV Shows</Link></li>
            </ul>
          </nav>
        </aside>
        <Routes>
          <Route path="/" element={
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
          } />
          <Route path="/tvshows" element={<TVShows />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
