const express = require('express')
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler')
const {connectDB} = require('./config/dbConnection/dbConnection')

const CONNECTION_STRING_CONTACTS = 'mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/myContactsBackend?retryWrites=true&w=majority'
const CONNECTION_STRING_MOVIES = 'mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/sample_mflix?retryWrites=true&w=majority'
// connectDB(process.env.CONNECTION_STRING_CONTACTS); // database connected with database link
connectDB(CONNECTION_STRING_MOVIES); // database connected with database link
// process.env.CONNECTION_STRING ='mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/myContactsBackend?retryWrites=true&w=majority'


const app = express()

const constant = require('./common/_constant').constant
const PORT = process.env.PORT || constant.PORT;
const AngularPort = 4200;



// use all the middleware here
app.use(express.json()) // this is inbuilt middleware // this is a body parser that parse the date stream which we receives from the client on the server side
// app.use("/api/contacts" , require("./routes/contactRoutes")) // use routes   // syntax app.use('url' , routerFunction)

app.use(function (req, res, next) {
    // console.log("req ports = " , req.address())
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("req ports = " , fullUrl)
    console.log("req ports = " , req.get('host'))
    const clientUrl = req.header('Referer');
    console.log(clientUrl);
    
    // remove / from client url at last
    const modifiedClientUrl = clientUrl.slice(0,(clientUrl.length-1))

    res.setHeader('Access-Control-Allow-Origin',modifiedClientUrl );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api/movies" , require("./routes/movieRoutes")) // use routes   // syntax app.use('url' , routerFunction)
app.use(errorHandler) // this is middlware where we chnage error to json // this is a custom middleware which accepts req , resp then in between which is going to transform in between into json


// server
const serverConfirmation = (success , fail) =>{
    if(!fail) console.log("server is runnig success fully on " , PORT);
}
app.listen(PORT , serverConfirmation)


