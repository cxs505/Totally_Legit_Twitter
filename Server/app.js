const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();
app.use(bodyParser.json());



//data from the posts will be stored here
const bP = [
    {post: "welcome to Totally Legit Twitter. Please type a message under 150 characters."}
]

app.get('/', (req, res) => {
    res.send("Hello AH su")
  });

//

app.get("/blogPost", (req, res) => res.send({bP}))
// Post request for form
app.post("/blogPost"), (req, res) => {
    const blogPost = req.body;
    const newPost = {blogPost};
    bP.push(newPost);
    res.status(201).send(newPost)
}


app.listen(port, () => console.log(`Server started in http://localhost:${port}`));
