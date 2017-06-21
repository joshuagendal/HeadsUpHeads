const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

let getCommentForm = (req, res) => {
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new.ejs', {post: post});
        }
    });
}

let postComment = (req, res) => {
    Post.findById(req.params.id, function(err, postToCommentOn){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            var commentText = req.body.commentText;
            var userCommenting = {
                id: req.user._id,
                username: req.user.username
            }
            var created = new Date();
            var newComment = {commentText: commentText, userCommenting: userCommenting, created: created}
            Comment.create(newComment, function(err, newlyAddedComment){
                if(err){
                    console.log(err);
                    res.redirect('/');
                } else {
                    postToCommentOn.comments.push(newlyAddedComment);
                    postToCommentOn.save();
                    res.redirect('/message-board/' + postToCommentOn._id);
                }
            });
        }
    });
}

let getEditCommentForm = (req, res) => {
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit-comment.ejs", {post_id: req.params.id, comment: comment});
        }
    });    
}

let putUpdateComment = (req, res) => {
    var data = {commentText: req.body.commentText}

    Comment.findByIdAndUpdate(req.params.comment_id, data, function(err, updatedComment){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/message-board/" + req.params.id);
        }
    });    
}

let deleteComment = (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/message-board/' + req.params.id);
        }
    });
}

module.exports = {
    getCommentForm,
    postComment,
    getEditCommentForm,
    putUpdateComment,
    deleteComment
}