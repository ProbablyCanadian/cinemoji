// server.js
const express = require('express');
const { processMovie } = require('./script');

const app = express();
let movieResult = null;

app.get('/api/movie', async (req, res) => {
    if (!movieResult) {
        try {
            movieResult = await processMovie();
        } catch (error) {
            console.error('Error processing movie:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    res.json({ movie: movieResult });
});

app.listen(3001, async () => {
    console.log('Server is running on port 3001');
    // Execute processMovie() when the server starts
    try {
        movieResult = await processMovie();
        console.log('Initial movie processed:', movieResult);
    } catch (error) {
        console.error('Error processing initial movie:', error);
    }
});
