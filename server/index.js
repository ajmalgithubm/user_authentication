const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config()
const authRouter = require('./Routes/AuthRoute')
const {MONGO_URL, PORT} = process.env;
   
// connecting the mongoose
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Mongodb successfully connected");
}).catch(err => {
    console.log("error occur when connecting", err)
})
// crating server
app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`)
})

// cors specify the domain for the access
 
app.use(cors({
    origin: ['http://localhost:4001', 'http://localhost:3000'],
    methods:['GET', 'POST',  'PUT', 'DELETE'],
    credentials:true
}))
 
app.use(express.json()); 
app.use(cookieParser());

app.use('/',authRouter); 