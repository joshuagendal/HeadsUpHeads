const Post = require('../models/post');
const Event = require('../models/event');
const async = require('async');


module.exports = (app) => {

    // GET HOME PAGE 
    app.get('/', (req, res) => {   

        // HOME PAGE --- query 5 recent events and posts asychronously
        const successMsg = req.flash('signupSuccessMsg');
        var fiveRecentPosts = {};
        var fiveRecentEvents = {};

        async.parallel([
            function(cb){
                Post.find({}).sort({_id:-1}).limit(5).exec((err, recentPosts) => {
                    if(err){
                        return cb(err);
                    } else {
                        fiveRecentPosts = recentPosts;
                        cb();
                    };
                });
            },
            function(cb){
                Event.find({}).sort({_id:-1}).limit(5).exec((err, recentEvents) => {
                    if(err){
                        return cb(err);
                    } else {
                        fiveRecentEvents = recentEvents;
                        cb();
                    };
                });
            }
        ], function(err){
            if(err){
                return next(err);
            } else {
                res.render('home.ejs', {
                    mostRecentPosts: fiveRecentPosts,
                    mostRecentEvents: fiveRecentEvents,
                    successMsg: successMsg,
                    hasSuccessMsg: successMsg.length > 0
                });
            }
        });
    });
        // Post.find({}).sort({_id:-1}).limit(5).exec((err, recentPosts) => {
        //     if(err){
        //         console.log(err);
        //     } else {
        //         fiveRecentPosts = recentPosts;
        //     };
        // });
    //     Event.find({}).sort({_id:-1}).limit(5).exec((err, recentEvents) => {
    //         if(err){
    //             console.log(err);
    //             res.redirect('/');
    //         } else {
    //             res.render('home.ejs', {
    //                 mostRecentPosts: fiveRecentPosts,
    //                 mostRecentEvents: recentEvents,
    //                 successMsg: successMsg,
    //                 hasSuccessMsg: successMsg.length > 0
    //             });
    //         }
    //     });
    // });
                // res.render('home.ejs', {
                //     recentPosts: recentPosts,

                // });
                //     successMsg: successMsg,
                //     hasSuccessMsg: successMsg.length > 0


        // async.parallel({
        //     recentPosts: function(posts){
        //         Post.find({}).sort({_id:-1}).limit(5).exec(posts);
        //     },
        //     recentEvents: function(events){
        //         Event.find({}).sort({_id:-1}).limit(5).exec(events);
        //     }
        // }, (err, result) => {
        //     const result
        // })
        
        // res.render('home.ejs', { successMsg: successMsg, hasSuccessMsg: successMsg.length > 0});


    app.get('/home', (req, res) => {
        const successMsg = req.flash('signupSuccessMsg');
        res.render('home.ejs', { successMsg: successMsg, hasSuccessMsg: successMsg.length > 0});
    });

    app.get('/about-us', (req, res) => {
        res.render('aboutUs.ejs');
    });



	require('./user')(app);
	require('./messageBoard')(app);
	require('./comment')(app);
	require('./event')(app);
    require('./emailVerification')(app);
    
}