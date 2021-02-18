/** @format */

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourmail@gmail.com",
    pass: "yourPassword",
  },
});

const sendWelcomeEmail = (email, name) => {
  var mailOptions = {
    from: "yourmail@gmail.com",
    to: email,
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendCancelationEmail = (email, name) => {
  var mailOptions = {
    from: "yourmail@gmail.com",
    to: email,
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};