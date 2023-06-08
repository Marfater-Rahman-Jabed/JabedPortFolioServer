const express = require('express');
const cors = require('cors');

const { query } = require('express');

const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

const is_live = false //true for live, false for sandbox


app.use(cors());
app.use(express.json());


function sendEmail(data) {
    const { email, message, phone, name } = data
    const auth = {
        auth: {
            api_key: process.env.PRIVATE_API,
            domain: process.env.MAILER_DOMAIN
        }
    }
    const transporter = nodemailer.createTransport(mg(auth));
    transporter.sendMail({
        from: "marfaterrahman@gmail.com", // verified sender email
        to: `marfaterrahman@gmail.com`, // recipient email
        subject: `New Client Mr. ${name} Sent a message`, // Subject line
        text: "Hello world!", // plain text body
        html: `
        <p>Client Name: <b>${name}</b></p>
        <p>Client Phone: <b>${phone}</b></p>
        <p>Client Email: <b>${email}</b></p>
        <h3 >Client Message: <b>${message}</b></h3>
        
        `, // html body
    }, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.post('/sendEmail', async (req, res) => {
    const data = req.body;
    sendEmail(data);
    res.send('Mail is send ..')

})

app.get('/', (req, res) => {
    res.send('Jabed Portfolio server running')
})

app.listen(port, () => {
    console.log(`Jabeds Portfolio running on port ${port}`)
})