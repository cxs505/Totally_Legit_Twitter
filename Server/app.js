const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: '*'}))

app.listen(port, () => console.log(`Server started! Visit http://localhost:${port} !`));

//data from the posts will be stored here
const timeline = [
    {post: "original post 1.", replies: ["1st reply to post 1", "2nd reply to post 1"]},
    {post: "original post 2", replies: []},
    {post: "original post 3.", replies: ["1st reply to post 3", "2nd reply to post 3"]},
];

app.get('/', (req, res) => {res.send("Hello World!")});

app.get("/blogpost", (req, res) => res.send({timeline}));

app.post("/blogpost", (req, res) => {
    const postText = req.body;
    const newPost = {...postText};
    timeline.push(newPost);
    res.header("Access-Control-Allow-Origin", '*');
    res.status(201).send(newPost)
});
