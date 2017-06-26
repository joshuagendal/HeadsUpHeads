const mongoose = require('mongoose');
const app = require('../server.js');
const request = require('supertest')(app);
const expect = require('expect');
const User = require('../models/user');

describe('UserLogin', () => {
    before ((done)  => {
        User.remove({}, () => {
            done();
        });
    });

    it('Should do this and that', () => {
        expect(5).toBe(5);
        expect(true).toBe(true);
    });

    it('Create new user', (done) => {  // done is callback
        const newUser = {
            username: 'test123',
            firstName: 'Tseter',  // it block: defines what you want to test
            lastName: 'McTester',
            email: 'joshgendal@yahoo.com',
            password: 'blahblah123',
            company: 'Test Company',
        }
        request.post('/signup')
            .send(newUser)    // sednign new user to the route- endpoint in request
            .end((err, res) => {
                // console.log('error ', err); console.log('response', res)
                expect(res.text.message).toBe('Queued. Thank you.');
                expect(err).toBeUndefined();
                done();
            });
            
            
             // request has callback that takes error and response
    });
});


