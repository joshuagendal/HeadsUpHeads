const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

let getMessageBoard = (req, res) => {
   Post.find({}).sort({_id:-1}).exec((err, allPosts) => {
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.render('messageBoard/message-board.ejs', {
                posts: allPosts});
        }
    });
}

let postMessageBoard = (req, res) => {
    //var newPost = new Post();
    const postHeading = req.body.postHeading;
    const postText = req.body.postText;
    const userPosting = {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
    }
    const created = new Date();
    const newPost = {postHeading: postHeading, postText: postText, userPosting: userPosting, created: created}
    Post.create(newPost, function(err, newlyPosted){
        if(err){
            
        } else {
            req.flash('success', 'You have successfully posted to the message board!');
            res.redirect('/message-board');
        }
    });
}

let getIndividualPostById = (req, res) => {
    Post.findById(req.params.id).populate('comments').exec(function(err, queriedPost){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render('messageBoard/viewPostNew.ejs', {queriedPost: queriedPost});
        }
    });
}

let getEditPostForm = (req, res) => {
    Post.findById(req.params.id, function(err, queriedPostToEdit){
        res.render("messageBoard/edit-post.ejs", {queriedPostToEdit: queriedPostToEdit});
    });
}    

let putUpdateEditedPost = (req, res) => {
    const data = {
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

let messageBoardPostValidation = (req, res, next) => {
    if(!req.body.postHeading || !req.body.postText) {
        req.flash('error', 'Your post must have a heading and a body!');
        res.redirect('/message-board/new-post');
    } else {
        next();
    }
}

module.exports = {
    getMessageBoard,
    postMessageBoard,
    getIndividualPostById,
    getEditPostForm,
    putUpdateEditedPost,
    deletePost,
    messageBoardPostValidation
};