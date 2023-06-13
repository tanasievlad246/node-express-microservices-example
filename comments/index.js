const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// const comments = [];
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    console.log(commentsByPostId)
    // console.log(comments)
    res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    res.status(201).json(comments);
});

app.listen(4010, () => {
    console.log('Comments server listening on port 4010');
});