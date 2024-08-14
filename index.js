const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/send-email', async (req, res) => {
  const { to, subject, text } = req.query;

  if (!to || !subject || !text) {
    return res.status(400).send('Missing required fields');
  }

  let transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `${process.env.EMAIL}`,
      to: to,
      subject: subject,
      text: text,
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
