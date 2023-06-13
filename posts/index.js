const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
   res.json(posts);
});

app.post('/posts', async (req, res) => {
    try {
        const id = randomBytes(4).toString('hex');
        const { title } = req.body;
        posts[id] = {
            id, title
        };
        await axios.post('http://localhost:4009/events', {
            type: 'PostCreated',
            data: posts[id]
        })
        res.json({
            id, title
        })
    } catch (error) {
        console.log(error); 
    } 
});

app.post('/events', (req, res) => {
    console.log('Event received', req.body.type);
    res.send({});
});

app.listen(3001, () => {
    console.log('posts server listening on port 3001');
});