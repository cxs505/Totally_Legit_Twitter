const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log(`Server started! Visit http://localhost:${port}`));

//data from the posts will be stored here

const timeline = [];

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.get("/feed", (req, res) => {
    res.send({timeline})
});

app.post("/newpost", (req, res) => {
    const newId = timeline.length+1;
    const originalPost = req.body.post;
    const newPost = {id: newId, post: originalPost, thumbsUp:0, hilarious:0, thumbsDown:0, replies:[]};
    timeline.push(newPost);
    res.status(201).send(newPost);
});

app.post("/newreply", (req, res) => {
    const replyId = req.body.id;
    const replyText = req.body.replies;
    timeline[+replyId-1].replies.push(replyText);
    const newReply = timeline[+replyId-1];
    res.status(201).send(newReply);
});

app.post("/posreaction", (req, res) => {
    const replyId = req.body.id;
    console.log(timeline[+replyId-1].thumbsUp);
    timeline[+replyId-1].thumbsUp = timeline[+replyId-1].thumbsUp +1;
    console.log(timeline[+replyId-1].thumbsUp);
    const newReaction = timeline[+replyId-1];
    res.status(201).send(newReaction);
});
