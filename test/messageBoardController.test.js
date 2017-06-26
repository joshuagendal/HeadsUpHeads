const mongoose = require('mongoose');
const app = require('../server.js');
const request = require('supertest')(app);
const expect = require('expect');
const User = require('../models/user');

describe('MessageBoardPostsByLoggedInUder', () => {
    beforeEach((done) => {                  // BEFORE SETS UP PRECONDITIONS
    const logInUser = {
    email: 'joshgendal@gmail.com',
    password: 'treetree1'
    }
    request.post('/login')
        .send(logInUser)
        .end((err, res) => {
            if(err){
                console.log('LOGIN ERROR');
                throw err;
            } else {
                console.log('LOGIN SUCCESSFUL');
                done();
            }
        });  
    });


    it('should post successfully to MsgBrd as user joshgendal@gmail.com', (done) => {
        const newPost = {
            postHeading: 'TESTING IS FUN',
            postText: 'TESTING IS REALLY GREAT',
            // userPosting: {
            //     id: {type: "59507f51a28c1bb0f64ac37e",
            //     ref: 'User'
            //     },
            //     username: "joshgendal@gmail.com",
            //     email: "joshgendal@gmail.com",
            // }
        }
        request.post('/message-board/new-post') // callback function to findById
            .send(newPost)
            .end((err, res) => {
                // console.log('RESPONSE!!!!!', res);
                // User.findById({id: req.params.id});
                expect(err).toBeUndefined;

                done();

                // expect(res.params.postHeading).toBe('TESTING IS FUN');
                // expect(res.params.postHeading).toBe('TESTING IS REALLY GREAT');
                // expect(err).toBeUndefined();
                // done();
        });
    });
});    
    




    // it('should get a new msg brd post form with correct user', (done) => {

    // beforeEach((done) => {                  // BEFORE SETS UP PRECONDITIONS
    //     const logInUser = {
    //     email: 'joshgendal@gmail.com',
    //     password: 'treetree1'
    //     }
    //     request.post('/login')
    //         .send(logInUser)
    //         .end((err, res) => {
    //             if(err){
    //                 console.log('LOGIN ERROR');
    //                 throw err;
    //             } else {
    //                 console.log('LOGIN SUCCESSFUL');
    //             }
    //         });  
    // });
