import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@mui/material';
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

function Movies() {
  return <h2>Welcome to CineMoji 🎬</h2>;
}

function TVShows() {
  return <h2>TV Shows</h2>;
}

function App() {
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debouncedMessage = useDebounce(message, 500);
  const correctAnswer = 'Inception';
  const [wrongCount, setWrongCount] = useState(0);
  const [revealedEmojis, setRevealedEmojis] = useState(2);
  const [guessResult, setGuessResult] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]); // State to store incorrect guesses
  const [attempts, setAttempts] = useState(0); // State to track attempts
  const [disableSend, setDisableSend] = useState(false); // State to disable Send button after correct answer

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

    if(showSuggestions) {
      fetchMovies();
    }
  }, [debouncedMessage, showSuggestions]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (value) => {
    setMessage(value);
    setSuggestions([]);
    setShowSuggestions(false);
  };
  
  const sendMessage = () => {
    setAttempts(prevAttempts => prevAttempts + 1); // Increment attempts
    if (message.trim() !== '') {
      if (message.trim() === correctAnswer) {
        const remainingAttempts = 4 - wrongCount;
        const attemptsEmojis = '🟠'.repeat(wrongCount) + '🟢'.repeat(1) + '⚪'.repeat(4 - Math.min(4, wrongCount + 1)); // Adjust for unused attempt
        setGuessResult(attemptsEmojis);
        setRevealedEmojis(8);
        setDisableSend(true); // Disable send button after correct answer

        // Add the correct guess to the list of incorrect guesses in green color
        setIncorrectGuesses([...incorrectGuesses, { guess: message, correct: true }]);
        setAttempts('You did it!');
      } else {
        setWrongCount(prevCount => prevCount + 1);
        if (wrongCount < 3) {
          setGuessResult('❌');
          setRevealedEmojis(prevCount => prevCount + 2);
          // Add the incorrect guess to the list of incorrect guesses in red color
          setIncorrectGuesses([...incorrectGuesses, { guess: message, correct: false }]);
        } else {
          setRevealedEmojis(8);
        }
      }
      setMessage('');
    } else {
      setGuessResult('Please enter a message.');
    }
  };  

  const renderEmojis = () => {
    let emojis = '';
    for (let i = 0; i < 8; i++) {
      if (i < revealedEmojis) {
        emojis += ['🧠', '💭', '🕰️', '🎭', '🔑', '🚪', '🌌', '🔁'][i];
      } else {
        emojis += '🔒';
      }
    }
    return emojis;
  };

  return (
    <Router>
      <div className="App">
        <aside className="App-sidebar">
          <nav>
            <ul>
              <li><Link to="/">Movies</Link></li>
              <li><Link to="/tvshows">TV Shows</Link></li>
            </ul>
          </nav>
        </aside>
        <Routes>
          <Route path="/" element={
            <header className="App-header">
<<<<<<< HEAD
              <h2>CineMoji 🎬 </h2>
              <h2>{renderEmojis()}</h2>
              <div className="descr">
                <h4>
                  Try your hand at guessing the movie title based upon an emoji summary generated by ChatGPT.
                </h4>
              </div>
=======
              <h1>CineMoji🎬</h1>
              <h1>🧠💭🕰️🎭🔑🚪🌌🔁</h1>
                <div className="descr">
                    <h4>Try your hand at guessing the movie title based upon an emoji summary generated by ChatGPT.</h4>
                </div>
>>>>>>> 582651e6060af2bf2b2ab7bfebe7b565ce3a2c4d
              <div className="autocomplete">
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  placeholder="Type your guess here..."
                  disabled={disableSend} // Disable input when correct answer is given
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
              <Button variant="contained" onClick={sendMessage} disabled={disableSend}>Send</Button>
              <h4>{guessResult}</h4>
              {incorrectGuesses.length > 0 && (
                <div style={{ textAlign: 'center' }}>
                  {incorrectGuesses.slice().reverse().map((guess, index) => (
                    <div key={index} style={{ color: guess.correct ? 'green' : 'red' }}>
                      {guess.guess}
                    </div>
                  ))}
                </div>
              )}
              {attempts !== 'You did it!' && <h4>{attempts}/4 Attempts</h4>}
              {attempts === 'You did it!' && <h4>You did it!</h4>}
            </header>
          } />
          <Route path="/tvshows" element={<TVShows />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
