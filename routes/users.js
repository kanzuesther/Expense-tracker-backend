const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const KEY = process.env.KEY || "jwttokenkey" 

router.post('/signup', async (req, res) => {
    const { username, email, password, gender, dob } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.json({ message: "user already existed" })
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        gender,
        dob,
        password: hashpassword,

    })

    await newUser.save()
    return res.json({ status: true, message: "Account created successfully !!!" })

})
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(404).json({ message: "user does not exist !!!" })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid password try again !!!" })
    }

    const token = jwt.sign({ username: user.username }, KEY, { expiresIn: '1hr' })
    res.cookie('token', token, { httpOnly: true, maxAge: 36000 })
    return res.json({ message: "login successfully", data: {...user.getUserObjectWithoutHash(), token} })
})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "user not registered" })
        }
        var nodemailer = require('nodemailer');

        const token = jwt.sign({ usrername: user.username }, KEY, { expiresIn: '1hr' })


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kanzues65@gmail.com',
                pass: 'yourpassword'
            }
        });

        var mailOptions = {
            from: 'kanzues65@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "error sending email" })
            } else {
                return res.json({ status: true, message: "email sent" })

            }
        });

    } catch (err) {
        console.log(err)
    }
})

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body
    try {
        const decoded = jwt.verify(token, KEY);
        const id = decoded.id;
        const hashpassword = bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({ _id: id }, { password: hashpassword })
        return res.json({ status: true, message: "updated password" })
    }
    catch (err) {
        return res.json("invalid token")
    }

})
module.exports = router;