const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(events);
    axios.post('http://localhost:4011/events', event)
    axios.post('http://localhost:3001/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:3005/events', event)
    console.log(event.type);
    res.status(200).send({ status: 'OK' }); // send response back to event-bus service to let it know that the event was received successfully
});

app.get('/events', async (req, res) => {
    res.json(events);
});

app.listen(4009, () => {
    console.log('event bus Listening on 4009');
});