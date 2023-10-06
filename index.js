const express = require ('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid} = require('uuid');
uuid();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

let comments = [
    {
        id:uuid(),
        username: 'Lakshay',
        comment: ' lol this is so Amazing'
    },
    {
        id:uuid(),
        username: 'Mohit',
        comment: ' lol this is so funny'
    },
    {
        id:uuid(),
        username: 'Rohit',
        comment: ' lol this is so cool'
    },
    {
        id:uuid(),
        username: 'Mukesh',
        comment: ' lol this is so hooot!!'
    }
]

app.get('/comments', (req,res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new')
})

app.post('/comments', (req,res) => {
    const {username, comment} = req.body;
    comments.push({comment, username, id: uuid()})
    res.redirect('/comments')
})

app.get('/comments/:id', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show' , {comment})
})


app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment});
})

app.patch('/comments/:id' , (req,res) => {
    const {id} = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req,res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');

})

// app.get('/tacos', (req,res) => {
//     res.send("Get request!");
// })
// app.post('/tacos', (req,res) => {
//     const {type,qty} = req.body;
//     // console.log(req.body);
//     res.send(`post request: type ${type} and quantity is ${qty}`)
// })

app.listen(3000, ()=>{
    console.log("on 3000");
})
