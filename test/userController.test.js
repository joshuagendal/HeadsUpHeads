const mongoose = require('mongoose');
const app = require('../server.js');
const request = require('supertest')(app);
const expect = require('expect');
const User = require('../models/user');

describe('UserSignup', function() {

    // it('Create new user', function(done) {  // done is callback
    //     const newUser = {
    //         username: 'DUMMY USER',
    //         firstName: 'DUMMY',  // it block: defines what you want to test
    //         lastName: 'USER',
    //         email: 'TEST@TEST.com',
    //         password: 'blahblah123',
    //         company: 'Test Company',
    //     }
    //     request.post('/signup')
    //         .send(newUser)    // sednign new user to the route- endpoint in request
    //         .end((err, res) => {
    //             // console.log('error ', err); console.log('response', res)
    //             done();
    //         });
            
            
    //          // request has callback that takes error and response
    // });

//     it('Should give user already exists error', function(done) {
//         const newUser = {
//             username: 'DUMMY USER',
//             firstName: 'DUMMY',  // it block: defines what you want to test
//             lastName: 'USER',
//             email: 'TEST@TEST.com',
//             password: 'blahblah123',
//             company: 'Test Company',
//         }
//         request.post('/signup')
//             .send(newUser)
//             .end((err, res) => {
//                 expect(err).toBeUndefined;

//             });
//         const userWhoEmailTaken = {
//         username: 'DUMMY USER',
//         firstName: 'DUMMY',  // it block: defines what you want to test
//         lastName: 'USER',
//         email: 'TEST@TEST.com',
//         password: 'blahblah123',
//         company: 'Test Company',
//         }    
//         request.post('/signup')
//             .send(userWhoEmailTaken)
//             .end((err, res) => {
//                 console.log('ERROR', err);
//                 done();
//             });

//     });

        





//     after(function(done) {
//         User.remove({}, function() {
//             done();
//     });
// });

// });


