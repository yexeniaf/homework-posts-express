import express from "express";
import logger from "morgan";
import posts from "./posts/post.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger("dev"));

app.get('/', (req, res) => {
    res.send("Welcome to the homepage. Direct to posts!");
});

app.get("/posts", (req, res) => {
    res.json(posts)
}) 

// Get posts in order to read them 
app.get("/posts/:id", (req, res) => {
	const id = req.params.id;
	const post = posts.find(post => post.id === id);
	res.json(post);
})

// This  post takes care of creating a new post 
app.post("/posts", (req, res) => {
	const post = req.body;
	post.title = `${req.body.title}`;
	posts.push(post);
	res.json(posts);
})

// This put helps to edit an existing post
app.put("/posts/:id", (req, res) => {
    const id = req.params.id;
    const postIndex = posts.findIndex(post => post.id === id);

    const updatePost = {
        ...posts[postIndex], 
        id: req.body.id,
        title: req.body.title,
        imgURL: req.body.imgURL,
        content: req.body.content,
        author: req.body.author
    };
    
    posts.splice(postIndex, 1, updatePost);
    res.json(updatePost);
})

//  this lets you delete any post by their id. 
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id
    const postIndex = posts.findIndex(post => post.id === id)

    const deletePost = posts.find(p => p.id === id);
	console.log(deletePost);

    posts.splice(userIndex, 1)
    res.json(posts)
})



app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
});

