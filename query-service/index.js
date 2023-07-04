const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const postsWithComments = {};

app.use(express.json());

app.use(cors());

const handleEvents = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        postsWithComments[id] = { id, title, comments: [] };
    }
    if (type === 'CommentCreated') {
        const { id: commentId, content, postId, status } = data;
        postsWithComments[postId].comments.push({ id: commentId, content, status });
    }
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const comment = postsWithComments[postId].comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
}

app.get('/query', (req, res) => {
    console.log(postsWithComments);
    res.status(200).send(postsWithComments);
});

app.get('/query/:id', (req, res) => {
    console.log(postsWithComments[req.params.id])
    res.status(200).send(postsWithComments[req.params.id]);
});

app.post('/events', async (req, res) => {
    console.log('events query')
    const { type, data } = req.body;
  
    handleEvents(type, data);    
    
    res.status(200).send(postsWithComments[data.id]);
});


app.listen(4001, async () => {
    console.log('Query service Listening on 4001');

    const events = await axios.get('http://localhost:4009/events');
    for (let event of events.data) {
        console.log('Processing event:', event.type);
        handleEvents(event.type, event.data);
    }
});