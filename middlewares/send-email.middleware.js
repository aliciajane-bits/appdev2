const path = require('path');
const pug = require('pug');
const transporter = require('../config/nodemailer');

const sendEmailNotification = async (book) => {
  try {
    
    const compiledTemplate = pug.compileFile(
      path.join(__dirname, '../views/bookCreated.pug')
    );

    const html = compiledTemplate({
      title: book.title,
      author: book.author,
      year: book.yearPublished,
    });

    const mailOptions = {
      from: `"Book API" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.EMAIL_USERNAME, 
      subject: '📘 New Book Added to the Library',
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

module.exports = sendEmailNotification;
