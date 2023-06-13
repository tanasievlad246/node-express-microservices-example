const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

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

app.listen(3001, () => {
    console.log('posts server listening on port 3001');
});