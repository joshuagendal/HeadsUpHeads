const emailController = require('../controllers/emailController');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

// @TODO send email to user whose post is commented on

let getCommentForm = (req, res) => {
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new.ejs', {post: post});
        }
    });
}

// POST COMMENT
let postComment = (req, res) => {
    Post.findById(req.params.id, function(err, postToCommentOn){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            const commentText = req.body.commentText;
            const userCommenting = {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email
            }
            const created = new Date();
            const newComment = {commentText: commentText, userCommenting: userCommenting, created: created}
            Comment.create(newComment, function(err, newlyAddedComment){
                if(err){
                    console.log(err);
                    res.redirect('/');
                } else {
                    postToCommentOn.comments.push(newlyAddedComment);
                    postToCommentOn.save();
                    // @TODO: send email to user whose post was commented on

                    let htmlData = `
                        <h3>
                            Hello ${postToCommentOn.userPosting.username}! ${newlyAddedComment.userCommenting.username}
                            has commented on your post ${postToCommentOn.postHeading}. The comment is as
                            follows: ${newlyAddedComment.commentText}. Please click <a href="http://localhost:3000/message-board/${postToCommentOn._id}">HERE</a>
                            to view the post and comment.
                        </h3>
                    `;
                    let email = postToCommentOn.userPosting.email;
                    let subject = `${postToCommentOn.userPosting.username}, you have a new comment on
                    your post ${postToCommentOn.postHeading}`;
                    emailController.sendEmail(htmlData, email, subject, (err, stat) => {
                        if(err){
                            console.log(err);
                        } else {
                            console.log('COMMENT EMAIL SUCCESS');
                        }
                    });
                    req.flash('success', 'Your comment was posted successfully!');
                    res.redirect('/message-board/' + postToCommentOn._id);
                }
            });
        }
    });
}

// GET EDIT COMMENT FORM
let getEditCommentForm = (req, res) => {
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit-comment.ejs", {post_id: req.params.id, comment: comment});
        }
    });    
}

// EDIT COMMENT PUT ROUTE
let putUpdateComment = (req, res) => {
    const data = {commentText: req.body.commentText}

    Comment.findByIdAndUpdate(req.params.comment_id, data, function(err, updatedComment){
        if(err){
            res.redirect("/");
        } else {
            req.flash('success', 'Your comment was successfully edited!');
            res.redirect("/message-board/" + req.params.id);
        }
    });    
}

// DELETE COMMENT - ALREADY GOES THROUGH VALIDATION TO CHECK OWNERSHIP
let deleteComment = (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            req.flash('success', 'Your comment was successfully deleted!');
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