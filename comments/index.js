const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

// const comments = [];
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    console.log(commentsByPostId)
    // console.log(comments)
    res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    try {
        const commentId = randomBytes(4).toString('hex');
        const { content } = req.body;

        const comments = commentsByPostId[req.params.id] || [];
        comments.push({ id: commentId, content });
        commentsByPostId[req.params.id] = comments;
        await axios.post('http://localhost:4009/events', {
            type: 'CommentCreated',
            data: {
                id: commentId,
                content,
                postId: req.params.id
            }
        })
        res.status(201).json({ id: commentId, content });
    } catch (error) {
       console.log(error);
    }
});

app.post('/events', (req, res) => {
    console.log('Event received', req.body.type);
    res.send({});
});

app.listen(4011, () => {
    console.log('Comments server listening on port 4011');
});
