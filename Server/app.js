const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());

app.listen(port, () => console.log(`Server started! Visit http://localhost:${port} !`));

//data from the posts will be stored here
const timeline = [
    {id: 1, post: "original post 1.", replies: ["1st reply to post 1", "2nd reply to post 1"]},
    {id: 2, post: "original post 2", replies: []},
    {id: 3, post: "original post 3.", replies: ["1st reply to post 3", "2nd reply to post 3",]},
];

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.get("/blogpost", (req, res) => {
    res.send({timeline})
});

app.post("/newpost", (req, res) => {
    const originalPost = req.body.post;
    const postReplies = req.body.replies;
    const newId = timeline.length+1;
    const newPost = {id: newId, post: originalPost, replies:postReplies};
    timeline.push(newPost);
    res.status(201).send(newPost)
});

app.post("/newreply", (req, res) => {
    const replyId = req.body.id;
    const replyText = req.body.replies; //check postdata to match
    timeline[+replyId-1].replies.push(replyText);
    res.status(201).send({timeline})     //not sure about this
});
