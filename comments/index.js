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
        comments.push({ id: commentId, content, status: 'pending' });
        commentsByPostId[req.params.id] = comments;
        await axios.post('http://localhost:4009/events', {
            type: 'CommentCreated',
            data: {
                id: commentId,
                content,
                postId: req.params.id,
                status: 'pending'
            }
        })
        res.status(201).json({ id: commentId, content });
    } catch (error) {
       console.log(error);
    }
});

app.post('/events', async (req, res) => {
    console.log('Event received', req.body.type);
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;

        await axios.post('http://localhost:4009/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content: comment.content
            }
        });
    }

    res.send({});
});

app.listen(4011, () => {
    console.log('Comments server listening on port 4011');
});
