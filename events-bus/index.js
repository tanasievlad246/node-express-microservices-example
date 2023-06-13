const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4011/events', event)
    axios.post('http://localhost:3001/events', event)
    axios.post('http://localhost:4001/events', event)
    console.log(event.type);
    res.status(200).send({ status: 'OK' }); // send response back to event-bus service to let it know that the event was received successfully
});

app.listen(4009, () => {
    console.log('event bus Listening on 4009');
});