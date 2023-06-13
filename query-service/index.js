const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const postsWithComments = {};

app.use(express.json());

app.use(cors());

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
    switch (type) {
        case 'PostCreated':
            const { id, title } = data;
            postsWithComments[id] = { id, title, comments: [] };
            break;
        case 'CommentCreated':
            const { id: commentId, content, postId } = data;
            postsWithComments[postId].comments.push({ id: commentId, content });
            break;
    }
    console.log(postsWithComments);
    res.status(200).send(postsWithComments[data.id]);
});


app.listen(4001, () => {
    console.log('Query service Listening on 4001');
});