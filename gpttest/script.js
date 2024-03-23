import { config } from 'dotenv';
import { OpenAI } from 'openai';

// Load environment variables
config();

// Initialize OpenAI client with your API key
const openai = new OpenAI({ apiKey: process.env.GPT_KEY });

// Define a function for sending a message to the OpenAI API and logging the response
async function getMovie() {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: "Generate the name of a popular movie. Output the name only and nothing else"}],
        });
        // Log and return the assistant's response
        const output = response.choices[0].message.content.trim();
        console.log(output);
        return output;
    } catch (error) {
        console.error("Error in sending message: ", error);
        return null; // Return null or a suitable value in case of error
    }
}

async function getEmojis(movie) {
    if (!movie) return; // Handle null or undefined movie names
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `Represent the movie '${movie}' using only 10 emojis`}],
        });
        // Log and return the assistant's response
        const output = response.choices[0].message.content.trim();
        console.log(output);
        return output;
    } catch (error) {
        console.error("Error in sending message: ", error);
    }
}

// Use the functions
async function processMovie() {
    const movie = await getMovie(); // Await the promise to get the movie name
    if (movie) {
        await getEmojis(movie); // Only call getEmojis if a movie name was successfully retrieved
    }
}

processMovie();