<<<<<<< HEAD
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

=======
const express = require("express");
const port = process.env.PORT || 3000;
>>>>>>> 7a797f308573449ed53e9e9b66da07e4516745fb
const bodyParser = require("body-parser");
const cors = require("cors")

<<<<<<< HEAD
app.use(bodyParser.json())
app.use(cors)
=======
const app = express();
app.use(bodyParser.json());
>>>>>>> 7a797f308573449ed53e9e9b66da07e4516745fb



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


<<<<<<< HEAD
app.listen(port, () => console.log(`connected to ${port}`))

module.exports = app
=======
app.listen(port, () => console.log(`Server started in http://localhost:${port}`));
>>>>>>> 7a797f308573449ed53e9e9b66da07e4516745fb
