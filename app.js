const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { readdirSync } = require('fs');
const UserRouter = require('./routes/users.js');
const db = require('./db/db.js');

const PORT = process.env.PORT || 5000;

//middlewears
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use('/auth',UserRouter)

//routes
readdirSync('./routes').map((route) => {
    app.use('/api/v1/', require('./routes/' + route)) 
})

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker')

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})
