const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
   res.json(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    res.json({
        id, title
    })
});

app.listen(3000, () => {
    console.log('posts server listening on port 3000');
});