const express = require('express')
require('dotenv').config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const expressValidator = require('express-validator');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
cors = require("cors");


//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')


//app
//const app = express()
const app=express().use('*', cors());

//db
mongoose.connect(process.env.DATABASE, {
    // userNewUrlParser: true,
    // userCreateIndex: true
}).then(() => console.log('DB Connected'));

app.get('/', (req,res) => {
    res.send("hello from node")
})

//middlewares
app.use(expressValidator())
app.use(morgan('dev'))
app.use(bodyParser.json())
app. use(function(req, res, next) {
    res. header("Access-Control-Allow-Origin", "*");
    res. header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
app.use(cookieParser())

//routes middleware
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", braintreeRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {console.log(`server is running on port ${port}`)})