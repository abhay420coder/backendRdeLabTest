const express = require('express')
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler')
const {connectDB} = require('./config/dbConnection/dbConnection')

// connectDB(process.env.CONNECTION_STRING_CONTACTS); // database connected with database link
connectDB(process.env.CONNECTION_STRING_MOVIES); // database connected with database link
// process.env.CONNECTION_STRING ='mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/myContactsBackend?retryWrites=true&w=majority'


const app = express()

const constant = require('./common/_constant').constant
const PORT = process.env.PORT || constant.PORT;



// use all the middleware here
app.use(express.json()) // this is inbuilt middleware // this is a body parser that parse the date stream which we receives from the client on the server side
// app.use("/api/contacts" , require("./routes/contactRoutes")) // use routes   // syntax app.use('url' , routerFunction)
app.use("/api/movies" , require("./routes/movieRoutes")) // use routes   // syntax app.use('url' , routerFunction)
app.use(errorHandler) // this is middlware where we chnage error to json // this is a custom middleware which accepts req , resp then in between which is going to transform in between into json


// server
const serverConfirmation = (success , fail) =>{
    if(!fail) console.log("server is runnig success fully on " , PORT);
}
app.listen(PORT , serverConfirmation)



/* 
const express = require('express')
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler')
const {connectDB} = require('./config/dbConnection/dbConnection')
const Router = express.Router()

const {getFullContacts,getContactById,postContact,updateContactById,deleteContactById} = require('./controllers/contactControllers')

connectDB(process.env.CONNECTION_STRING); // database connected with database link
// process.env.CONNECTION_STRING ='mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/myContactsBackend?retryWrites=true&w=majority'


const app = express()

const constant = require('./common/_constant').constant
const PORT = process.env.PORT || constant.PORT;


 
// use all the middleware here
app.use(express.json()) // this is inbuilt middleware // this is a body parser that parse the date stream which we receives from the client on the server side

const _contactControl= {
    "getFullData":getFullContacts , 
    "postData" : postContact,
    "getDataById" : getContactById,
    "updateDataById" : updateContactById,
    "deleteDataById" : deleteContactById
}
const {routing} = require("./routes/contactRoutes")
// Router.use(routing(_contactCont))
app.use("/api/contacts" , routing(_contactControl)) // use routes   // syntax app.use('url' , routerFunction)
// app.use("/api/contacts" , Router.use(routing(_contactCont))) // use routes   // syntax app.use('url' , routerFunction)
app.use(errorHandler) // this is middlware where we chnage error to json // this is a custom middleware which accepts req , resp then in between which is going to transform in between into json


// server
const serverConfirmation = (success , fail) =>{
    if(!fail) console.log("server is runnig success fully on " , PORT);
}
app.listen(PORT , serverConfirmation)




*/