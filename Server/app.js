const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log(`Server started! Visit http://localhost:${port} !`));


blogposts=[]

//data from the posts will be stored here
const bP = [
    {post: "welcome to Totally Legit Twitter. Please type a message under 150 characters.", replies:['hello']},
]

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.get("/blogPost", (req, res) => res.send({bP}))
// Post request for form
app.post("/blogPost"), (req, res) => {
    const blogPost = req.body;
    const newPost = {...blogPost};
    bP.push(newPost);
    res.status(201).send(newPost)
}

module.exports=app