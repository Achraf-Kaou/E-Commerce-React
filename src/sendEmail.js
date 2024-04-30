const nodemailer = require('nodemailer');

const sendEmail = async (to, from, data) => {
  // Create a Nodemailer transporter using your SMTP or email service details
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: 'anaskaou744@gmail.com', // Your email address
      pass: 'achraf', // Your email password or app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from, // Sender's email address
    to, // Recipient's email address
    subject: 'Commande-Client',
    text: data,
    html: '<p>Email body HTML</p>', 
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // You can add additional logic here for handling success
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = sendEmail;