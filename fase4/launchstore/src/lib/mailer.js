const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b4df734efdfda6",
      pass: "766db1b5b48f20"
    }
  });

  module.exports = {
    transport
  }