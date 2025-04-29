const express = require('express');  // bruker express biblioteket
const { Pool } = require('pg'); // bruker pg biblioteket for å koble til postgres database

// PostgreSQL connection setup
const pool = new Pool({     // oppretter en ny pool for å koble til databasen
    user: 'postgres.kmahegtyinuhqxqsylhs',
    host: 'aws-0-eu-north-1.pooler.supabase.com',
    database: 'postgres',
    password: 'iF4BTKyf8QicgiUg',
    port: 5432, // Default PostgreSQL port
});

// Test the database connection

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to the PostgreSQL database');
    release();
});
console.log('Connected to the PostgreSQL database (maybe)');

const app = express();     // oppretter en ny express app -- dette er en webserver som kjører på port 3000
const PORT = 3000;

// Middleware to serve static assets
app.use(express.static('public'));


// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/sprak', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM språk'); // Replace with your table name
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from the database');
    }
})

app.get('/api/chat-rooms', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM chat_room'); // Replace with your table name
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from the database');
    }
})

// Start the server


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});