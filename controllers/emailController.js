const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const User = require("../models/user");

// MAILGUN AUTH INFO
const auth = {
  auth: {
    api_key: "key-edcbd28159c744e63519dc58eeb4f1de",
    domain: "mg.headsupheads.com"
  }
};

// SEND EMAIL FUNCTION
let sendEmail = (htmlData, email, subject, cb) => {
  // email is recipient cb = callback

  const nodemailerMailgun = nodemailer.createTransport(mg(auth));
  const options = {
    from: "Heads Up Heads Administrator <joshgendal@gmail.com>",
    to: email, // An array if you have multiple recipients.
    subject: subject,
    "h:Reply-To": "joshgendal@gmail.com",
    html: htmlData
  };

  nodemailerMailgun.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return cb(err, null);
    } else {
      console.log(info);
      return cb(null, info);
    }
  });
};

// SEND EMAIL TO ADMIN AFTER USER HAS VERIFIED OWN EMAIL
const sendEmailToAdmin = (username, userId, cb) => {
  let htmlData = `
    <b>
      Hello Admin, ${username} is trying to sign up. Please click this link > 
      following link to proceed in verifiying user access to post content on the site and such           
      <a href="http://headsupheads.herokuapp.com/verifyByAdmin?username=${username}">here</a>

      If you want to deny user access and delete the user, click the following link/button <br>
      <form id="deleteUserForm" action="http://headsupheads.herokuapp.com/${userId}/1m0a7c53ndtkejd?_method=DELETE" method="POST">
        <input type="submit" value="Delete">
      </form>
    </b>
  `;
  let subject = "Please verify this user";
  let adminEmail = "joshgendal@gmail.com";

  sendEmail(htmlData, adminEmail, subject, cb);
};

// VERIFY USER VIA TOKEN SENT TO EMAIL
const verifyUser = (req, res) => {
  console.log(req.query);
  if (req.query.token) {
    User.findOne({ userEmailKey: req.query.token }, (err, user) => {
      // find user by token matching up w/ userEmail
      if (err) {
        // TEST: IF SEND REQUEST TWICE
        res.send("Cannot verify email. Please contact the admins.");
      } else {
        if (user) {
          User.update(
            { username: user.username },
            {
              $set: {
                userEmailKey: "",
                userEmailVerified: true
              }
            },
            (err, stat) => {
              // Problem w/ server
              if (err) {
                res.send("Cannot verify email. Please contact the admins");
              } else {
                let htmlData = `
                <b> And we're glad glad glad that you'll arrive! You will 
                  receive an email shortly confirming access to the site!
                </b>
              `;
                let email = user.email;
                let subject = "We're glad you'll arrive!";
                // @TODO send email to user telling them admins have been notified
                sendEmail(htmlData, email, subject, (err, stat) => {
                  console.log("Administrative email sent");
                });
                sendEmailToAdmin(user.username, user.id, (err, stat) => {
                  res.send("Email verification successful");
                });
              }
            }
          );
        } else {
          res.send("Invalid token");
        }
      }
    });
  } else {
    res.send("Please do not alter URL. Go back to email!");
  }
};

// ADMIN RECEIVES EMAIL TO ADD USER OR DELETE USER. THIS IS WHEN USER IS VERIFIED
const verifyAdmin = (req, res) => {
  console.log(req.query.username);
  if (req.query.username) {
    User.findOne(
      {
        username: req.query.username
      },
      (err, user) => {
        if (err) {
          res.send("Cannot verify user");
        } else {
          if (user) {
            User.update(
              { username: req.query.username },
              { $set: { userVerifiedByAdmin: true } },
              (err, stat) => {
                if (err) {
                  res.send("Cannot verify user");
                } else {
                  let htmlData =
                    'Welcome to Heads up! Let"s get the show on the road!';
                  let email = user.email;
                  let subject = "Congratulations! Welcome to Heads Up Heads!";
                  sendEmail(htmlData, email, subject, (err, stat) => {
                    console.log("Administrative email sent");
                  });
                  res.send("User verified successfully!");
                }
              }
            );
          } else {
            res.send("This user does not exist");
          }
        }
      }
    );
  } else {
    res.send("Please do not alter url go back to email");
  }
};

// SEND PASSWORD RESET EMAIL
const sendPasswordResetEmail = (req, res) => {
  console.log("HIT SENDPASSWORDRESETEMAIL ROUTE");
  const userEmail = req.body.email;

  const htmlData = `
    <h4>Hello ${userEmail}. Please click the following Link</h4>
    <h1>
      <a href="http://headsupheads.com/harpua/reset-password/${userEmail}">HERE</a>
    </h1>
  `;
  const subject = "Reset Heads Up Password";
  sendEmail(htmlData, userEmail, subject, (err, status) => {
    console.log("RESET PASSWORD EMAIL SENT");
    console.log(status);
  });

  res.send("<h1>Please check your email for a password reset link!</h1>");
};

module.exports = {
  sendEmail,
  verifyAdmin,
  verifyUser,
  sendPasswordResetEmail
};
