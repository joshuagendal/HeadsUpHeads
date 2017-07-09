hwgilbertlaw@gmail.comconst nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const User = require('../models/user');

const auth = {
    auth: {
        api_key: 'key-edcbd28159c744e63519dc58eeb4f1de',
        domain: 'sandbox4c8b20bc42d346e2b23832bf3904e9a5.mailgun.org'
    }
};


const sendEmail = (htmlData, email, subject, cb) => {   // email is recipient cb = callback

    const nodemailerMailgun = nodemailer.createTransport(mg(auth));
    const options = {
        from: 'Heads Up Heads Administrator <joshgendal@gmail.com>',
        to: email, // An array if you have multiple recipients.
        subject: subject,
        'h:Reply-To': 'joshgendal@gmail.com',
        html: htmlData,
    };

    nodemailerMailgun.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return cb(err , null);
        }
        else {
            console.log(info);
            return cb(null , info);
        }
    });
}

const sendEmailToAdmin = (username, userId, cb) => {
    let htmlData = `
        <b>
            Hello Admin, ${username} is trying to sign up. Please click this link > 
            following link to proceed in verifiying user access to post content on the site and such            /:id/1m0a7c53ndtkejd/del
            <a href="http://localhost:3000/verifyByAdmin?username=${username}">here</a>

            If you want to deny user access and delete the user, click the following link/button <br>
            <form id="deleteUserForm" action="http://localhost:3000/${userId}/1m0a7c53ndtkejd?_method=DELETE" method="POST">
                <input type="submit" value="Delete">
            </form>
        </b>
    `;
    let subject = "Please verify this user";
    let adminEmail = 'hwgilbertlaw@gmail.com';

    sendEmail(htmlData, adminEmail, subject, cb);
}

// const sendEmailToUserWhosePostWasCommentedOn = (userPosted, userCommented, postSubject, postId, cb) => {
//     let htmlData = `
//         <h3>
//             Hello ${userPosted}, ${userCommented} has commented on your post, ${postSubject}.
//             Click <a href="http://localhost:3000/message-board/${postId}">HERE</a> to view the comment!
//         </h3>
//     `;
//     let subject = `You have a new comment on your post ${postSubject}!`;

//     sendEmail(htmlData, email, subject, cb);
// }

// This method verifies a user by token sent to his email
const verifyUser = (req, res) => {
    console.log(req.query);
    if(req.query.token) {       // if there was token sent in request
        User.findOne({"userEmailKey": req.query.token}, (err, user) => {   // find user by token matching up w/ userEmail
            if(err) { // TEST: IF SEND REQUEST TWICE
                res.send('Cannot verify email. Please contact the admins.');
            } else {
                if(user) {                      // extra layer of security - ensure there is a user in database and someone isnt trying to hack into system
                    User.update({username: user.username}, {        // ABSOLUTELY MUST VALIDATE USERNAME IS IN DB ONLY ONCE
                        "$set": {                   // this is permanent: changes values of your property in your database within a function
                            "userEmailKey": "",
                            "userEmailVerified": true
                        }
                    }, (err, stat) => {
                        if(err) {       // problem w/ server
                            res.send('Cannot verify email. Please contact the admins');
                        } else {
                            let htmlData = '<b> The administrators have been sent an email and will decide whether or not to verify you </b>';
                            let email = user.email;
                            let subject = 'Administrators have been sent email';
                            // @TODO send email to user telling them admins have been notified
                            sendEmail(htmlData, email, subject, (err, stat) => {
                                console.log('Administrative email sent');
                            });
                            sendEmailToAdmin(user.username, user.id, (err, stat) => {
                                res.send('Email verification successful');
                            });
                        }
                    });
                } else {
                    res.send('Invalid token');
                }
            }
        });
    } else {
        res.send('Please do not alter url go back to email');
    }
}

const verifyAdmin = (req, res) => {
    console.log(req.query.username);
    if(req.query.username) {
        User.findOne({
            "username": req.query.username
        }, (err,  user) => {
            if(err) {
                res.send('Cannot verify user');
            } else {
                if(user) {
                    User.update({"username": req.query.username}, {"$set": {"userVerifiedByAdmin": true}},
                        (err, stat) => {
                            if(err) {
                                res.send('Cannot verify user');
                            } else {
                                let htmlData = 'Congratulations! Welcome to Heads Up Heads!';
                                let email = user.email;
                                let subject = 'Welcome 2 Heads up Heads!';
                                sendEmail(htmlData, email, subject, (err, stat) => {
                                    console.log('Administrative email sent');
                                });
                                res.send('User verified successfully!');
                            }
                        });
                } else {
                     res.send('This user does not exist');
                }
            }
        });
    } else {
        res.send('Please do not alter url go back to email');
    }
}


module.exports = {
    sendEmail,
    verifyAdmin,
    verifyUser
}