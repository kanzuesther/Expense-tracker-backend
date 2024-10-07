const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { readdirSync } = require('fs');
const UserRouter = require('./routes/users.js');
const db = require('./db/db.js');
const { getUserFromToken, loginRequired } = require('./middlewares/auth.js');

dotenv.config();

const PORT = process.env.PORT || 5000;

//middlewears
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use('/auth',UserRouter);
app.use(getUserFromToken);

app.use('/api/v1/', loginRequired);
//routes
readdirSync('./routes').map((route) => {
    app.use('/api/v1/', require('./routes/' + route)) 
})

console.log(`Mongo url: ${process.env.MONGO_URL}`)
mongoose.connect(process.env.MONGO_URL)

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})
