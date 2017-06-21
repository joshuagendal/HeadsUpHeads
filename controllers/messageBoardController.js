const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

let getMessageBoard = (req, res, next) => {
   Post.find({}, function(err, allPosts) {
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.render('messageBoard/message-board.ejs', {posts: allPosts});
        }
    });
}

let postMessageBoard = (req, res) => {
    //var newPost = new Post();
    var postHeading = req.body.postHeading;
    var postText = req.body.postText;
    var userPosting = {
        id: req.user._id,
        username: req.user.username
    }
    var created = new Date();
    var newPost = {postHeading: postHeading, postText: postText, userPosting: userPosting, created: created}
    console.log(newPost);
    Post.create(newPost, function(err, newlyPosted){
        if(err){
            console.log(err);
        } else {
            console.log(newlyPosted);
            res.redirect('/')
        }
    });
}

let getIndividualPostById = (req, res) => {
    Post.findById(req.params.id).populate('comments').exec(function(err, queriedPost){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render('messageBoard/view-post.ejs', {queriedPost: queriedPost});
        }
    });
}

let getEditPostForm = (req, res) => {
    Post.findById(req.params.id, function(err, queriedPostToEdit){
        res.render("messageBoard/edit-post.ejs", {queriedPostToEdit: queriedPostToEdit});
    });
}    

let putUpdateEditedPost = (req, res) => {
    var data = {
        postHeading: req.body.postHeading,
        postText: req.body.postText
    }
    Post.findByIdAndUpdate(req.params.id, data, function(err, updatedPost){
        if(err){
            res.redirect("/")
        } else {
            res.redirect("/message-board/" + req.params.id);
        }
    });
}

let deletePost = (req, res) => {
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/');
        } else {
            res.redirect('/message-board');
        }
    });
}




module.exports = {
    getMessageBoard,
    postMessageBoard,
    getIndividualPostById,
    getEditPostForm,
    putUpdateEditedPost,
    deletePost
};