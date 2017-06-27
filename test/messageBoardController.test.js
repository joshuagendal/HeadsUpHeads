const mongoose = require('mongoose');
const app = require('../server.js');
const request = require('supertest')(app);
const expect = require('expect');
const User = require('../models/user');

describe('MessageBoardPostsByLoggedIUser', function() {
    beforeEach(function(done)  {                  // BEFORE SETS UP PRECONDITIONS
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


    it('should post successfully to MsgBrd as user joshgendal@gmail.com', function(done) {
        const newPost = {
            postHeading: 'TESTING IS FUN',
            postText: 'TESTING IS REALLY GREAT',
        }
        request.post('/message-board/new-post') // callback function to findById
            .send(newPost)
            .end((err, res) => {
                
                expect(err).toBeUndefined;

                done();
        });
    });
});    
    
                // console.log(typeof res);
                // console.log('RESPONSE!!!!!', res);
                // User.findById({id: req.params.id});



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
