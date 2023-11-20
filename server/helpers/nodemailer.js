const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "arytheodore533@gmail.com",
    pass: process.env.PASSWORD_NODEMAILER,
  },
});

const email = {
  from: "arytheodore533@gmail.com",
  subject: "Gadget Payment",
};

module.exports = { transporter, email };
