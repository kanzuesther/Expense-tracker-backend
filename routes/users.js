const router = require('express').Router();

router.post('/login', (req, res) => {
    res.json({message: "Underway"})
})
.post('/signup', (req, res) => {
    res.json({message: "Underway"})
})
.post('/logout',  (req, res) => {
    res.json({message: "Underway"})
})

module.exports = router