const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const User = require('../models/user');

const auth = {
    auth: {
        api_key: 'key-edcbd28159c744e63519dc58eeb4f1de',
        domain: 'sandbox4c8b20bc42d346e2b23832bf3904e9a5.mailgun.org'
    }
};

//
const sendEmail = (htmlData, email, subject, cb) => {   // email is recipient cb = callback
    //
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

const sendEmailToAdmin = (username, cb) => {
    let htmlData = `
        <b>
            Hello Admin, ${username} is trying to verify please click the  link to proceed
            <a href="http://localhost:3000/verifyByAdmin?username=${username}">here</a>
        </b>
    `;

    let subject = "Please verify this user";
    let adminEmail = 'joshgendal@gmail.com';

    sendEmail(htmlData, adminEmail, subject, cb);
}

// This method verifies a user by token sent to his email
const verifyUser = (req, res) => {
    console.log(req.query);
    if(req.query.token) {
        User.findOne({
            "userEmailKey": req.query.token
        }, (err, user) => {
            if(err) {
                res.send('Cannot verify email');
            } else {
                if(user) {
                    User.update(
                        {
                            username: user.username
                        },
                        {
                            "$set": {                   // this is permanent: changes values of your property in your database within a function
                                "userEmailKey": "",
                                "userEmailVerified": true
                            }
                        },
                        (err, stat) => {
                            if(err) {       // problem w/ server
                                res.send('Cannot verify email');
                            } else {
                                // @TODO send verification email to admin
                                sendEmailToAdmin(user.username, (err, stat) => {
                                    res.send('Email verification successful');
                                })
                            }
                        }
                    );
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
                    User.update(
                        {
                            "username": req.query.username
                        },
                        {
                            "$set": { 
                                "userVerifiedByAdmin": true
                            }
                        },
                        (err, stat) => {
                            if(err) {
                                res.send('Cannot verify user');
                            } else {
                                res.send('User verified successfully!');
                            }
                        }
                    );
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