const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require("body-parser");

app.use(bodyParser.json())



//data from the posts will be sored here
const bP = [
    {post: "welcome to Legit twitter. Please type a message under 150 characters."}
]

app.get('/', (req, res) => {
    res.send("Hello World")
  });

// Post request for form
app.post("/blogpost"), (req, res) => {
    const blogpost = req.body;
    const newPost = {blogpost};
    bP.push(newPost);
    res.status(201).send(newPost)
}


app.listen(port, () => console.log(`connected to ${port}`))