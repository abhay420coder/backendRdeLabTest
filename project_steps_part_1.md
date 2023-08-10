# step -1 : fiest do setup

## create project
* create project with the help of npm 
* run following command 

```js
npm init -y
```

## install some important library

### install express in project

* run following command 

```js
npm i express --save
```

### install nodemon in project

* run following command 

```js
npm i nodemon --save
```

### install mongodb in project

* run following command 

```js
npm i mongodb --save
```

### install mongoose in project

* run following command 

```js
npm i mongoose --save
```


## create `.gitignore` file 
* write the following code in `.gitignore` file

```js
/node_modules
/.env
```


## modify package.json
*   add  ` "start": "node server.js", "dev": "nodemon server.js" ` inside scripts
*   change value of main from index.js to server.js

```json
{
  "name": "backendrdelabtest",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1", // npm run test
    "start": "node server.js", //npm run start
    "dev": "nodemon server.js" // npm run dev
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongodb": "^5.7.0",
    "mongoose": "^7.4.2",
    "nodemon": "^3.0.1"
  }
}

```

## create server.js file

### create `_constant.js` inside common folder

* `_constant.js`

```js
exports.constant = {
    PORT : 8000,
}
```

* server.js

```js
const express = require('express')
const app = express()

const constant = require('./common/_constant').constant
const PORT = constant.PORT;

// server
const serverConfirmation = (success , fail) =>{
    if(!fail) console.log("server is runnig success fully on " , PORT);
}
app.listen(PORT , serverConfirmation)
```



## `.env` file :- only for development purpus
### install dotenv in project

* run following command 

```js
npm i dotenv --save
```

### create `.env` file :- only for development purpous

* `.env`

```js
PORT = 5000
```

* server.js

```js
const express = require('express')
const dotenv = require('dotenv').config();
const app = express()

const constant = require('./common/_constant').constant
const PORT = process.env.PORT || constant.PORT;

// server
const serverConfirmation = (success , fail) =>{
    if(!fail) console.log("server is runnig success fully on " , PORT);
}
app.listen(PORT , serverConfirmation)
```

# create routes 
## create route folder and keep `contactRoutes.js` inside routes folder
* `contactRoutes.js`

```js
const express = require('express')
const router = express.Router();


// routing
const getFullContacts = (req , res) => {
    res.status(200).json({"message":"getFullContacts  is working"});
}

const getContactById = (req , res) => {
    res.status(200).json({"message":"getContactById  is working" , "id":req.params.id});
    // http://localhost:5000/api/contacts/id ex:- http://localhost:5000/api/contacts/2
}

const postContact = (req , res) => {
    res.status(200).json({"message":"postContact  is working"});
}

const updateContactById = (req , res) => {
    res.status(200).json({"message":"updateContactById  is working", "id":req.params.id});
}

const deleteContactById = (req , res) => {
    res.status(200).json({"message":"deleteContactById  is working", "id":req.params.id});
}

router.route('/').get(getFullContacts)
router.route('/:id').get(getContactById)
router.route('/').post(postContact)
router.route('/:id').put(updateContactById)
router.route('/:id').delete(deleteContactById)

module.exports = router;
```

* now in `server.js`

```js
const express = require('express')
const dotenv = require('dotenv').config();

const app = express()

const constant = require('./common/_constant').constant
const PORT = process.env.PORT || constant.PORT;

app.use("/api/contacts" , require("./routes/contactRoutes"))  // use routes   // syntax app.use('url' , routerFunction)

// server
const serverConfirmation = (success , fail) =>{
    if(!fail) console.log("server is runnig success fully on " , PORT);
}
app.listen(PORT , serverConfirmation)
```

# create controller 
## create controller folder and keep `contactcontrollers.js` inside routes folder
* `contactcontrollers.js`

```js
// middleware

// @desc get all contacts
// @route GET /api/contacts
// @access public

const getFullContacts = (req , res) => {
    res.status(200).json({"message":"getFullContacts  is working"});
}


// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContactById = (req , res) => {
    res.status(200).json({"message":"getContactById  is working" , "id":req.params.id});
    // http://localhost:5000/api/contacts/id ex:- http://localhost:5000/api/contacts/2
}


// @desc Create new contacts
// @route POST /api/contacts
// @access public
const postContact = (req , res) => {
    res.status(201).json({"message":"postContact  is working"});
}


// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContactById = (req , res) => {
    res.status(200).json({"message":"updateContactById  is working", "id":req.params.id});
}


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContactById = (req , res) => {
    res.status(200).json({"message":"deleteContactById  is working", "id":req.params.id});
}

module.exports = {
    getFullContacts , 
    getContactById , 
    postContact,
    updateContactById,
    deleteContactById
}
```

* `contactROutes.js`

```js
const express = require('express')
const router = express.Router();

const {getFullContacts,getContactById,postContact,updateContactById,deleteContactById} = require('../controllers/contactControllers')

// routing

/* 
router.route('/').get(getFullContacts)
router.route('/').post(postContact)
router.route('/:id').get(getContactById)
router.route('/:id').put(updateContactById)
router.route('/:id').delete(deleteContactById) 


// works same as

router.route('/').get(getFullContacts).post(postContact)
router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById)
*/

router.route('/').get(getFullContacts).post(postContact)
router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById)

module.exports = router;
```


## get the data from client to server with the help of body parser


* `contactcontrollers.js`

```js
// middleware

// @desc get all contacts
// @route GET /api/contacts
// @access public

const getFullContacts = (req , res) => {
    res.status(200).json({"message":"getFullContacts  is working"});
}


// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContactById = (req , res) => {
    res.status(200).json({"message":"getContactById  is working" , "id":req.params.id});
    // http://localhost:5000/api/contacts/id ex:- http://localhost:5000/api/contacts/2
}


// @desc Create new contacts
// @route POST /api/contacts
// @access public
const postContact = (req , res) => {
    console.log("req.body ----------  " ,req.body)
    res.status(201).json({"message":"postContact  is working"});
}


// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContactById = (req , res) => {
    res.status(200).json({"message":"updateContactById  is working", "id":req.params.id});
}


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContactById = (req , res) => {
    res.status(200).json({"message":"deleteContactById  is working", "id":req.params.id});
}

module.exports = {
    getFullContacts , 
    getContactById , 
    postContact,
    updateContactById,
    deleteContactById
}
```

* `contactROutes.js`

```js
const express = require('express')
const router = express.Router();

const {getFullContacts,getContactById,postContact,updateContactById,deleteContactById} = require('../controllers/contactControllers')

// routing

/* 
router.route('/').get(getFullContacts)
router.route('/').post(postContact)
router.route('/:id').get(getContactById)
router.route('/:id').put(updateContactById)
router.route('/:id').delete(deleteContactById) 


// works same as

router.route('/').get(getFullContacts).post(postContact)
router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById)
*/

router.route('/').get(getFullContacts).post(postContact)
router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById)

module.exports = router;
```


* `server.js`

```js
const express = require('express')
const dotenv = require('dotenv').config();

const app = express()

const constant = require('./common/_constant').constant
const PORT = process.env.PORT || constant.PORT;


app.use(express.json())// this is inbuilt middleware // this is a body parser that parse the date stream which we receives from the client on the server side

app.use("/api/contacts" , require("./routes/contactRoutes"))  // use routes   // syntax app.use('url' , routerFunction)




// server
const serverConfirmation = (success , fail) =>{
    if(!fail) console.log("server is runnig success fully on " , PORT);
}
app.listen(PORT , serverConfirmation)
```

### get the error if there are no data in body 

* `contactcontrollers.js`

```js
// middleware

// @desc get all contacts
// @route GET /api/contacts
// @access public

const getFullContacts = (req , res) => {
    res.status(200).json({"message":"getFullContacts  is working"});
}


// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContactById = (req , res) => {
    res.status(200).json({"message":"getContactById  is working" , "id":req.params.id});
    // http://localhost:5000/api/contacts/id ex:- http://localhost:5000/api/contacts/2
}


// @desc Create new contacts
// @route POST /api/contacts
// @access public
const postContact = (req , res) => {
    console.log("req.body ----------  " ,req.body)
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fiels are manadatory")
    }

    res.status(201).json({"message":"postContact  is working"});
}


// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContactById = (req , res) => {
    res.status(200).json({"message":"updateContactById  is working", "id":req.params.id});
}


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContactById = (req , res) => {
    res.status(200).json({"message":"deleteContactById  is working", "id":req.params.id});
}

module.exports = {
    getFullContacts , 
    getContactById , 
    postContact,
    updateContactById,
    deleteContactById
}
```

# Create a middleware 

## create a middleware folder ,  create a `errorHandler.js` inside middleware folder

* `_constant.js`

```js
exports.constant = {
  PORT: 8000,
  STATUS_CODE: {
    INFORMATION_RESPONSES: {
      CONTINUE: 101,
      SWITCHING_PROTOCOLS: 101,
      PROCESSING: 102,
      EARLY_HINTS: 103,
    },
    SUCCESSFUL_RESPONSE: {
      OK: 200,
      CREATED: 201,
      ACCEPTED: 202,
      NON_AUTHORATIVE_INFORMATION: 203,
      NO_CONTENT: 204,
      RESET_CONTENT: 205,
      PARTIAL_CONTENT: 206,
      MULTI_STATUS: 207,
      ALREADY_REPORTED: 208,
      IM_USED: 226,
    },
    REDIRECTING_MESSAGES: {
      MULTIPLE_CHOICE: 300,
      MOVED_PERMANENTLY: 301,
      FOUND: 302,
      SEE_OTHER: 303,
      NOT_MODIFIED: 304,
      USE_PROXY: 305,
      UNUSED: 306,
      TEMPORARY_REDIRECT: 307,
      PERMANENT_REDIRECT: 308,
    },
    CLIENT_ERROR_RESPONSES: {
      BAD_REQUEST_VALIDATION_ERROR: 400,
      UNAUTHORIZED: 401,
      PAYMENT_REQUIRED: 402,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      METHOD_NOT_ALLOWED: 405,
      NOT_ACCEPTABLE: 406,
      PROXY_AUTHENTICATION_REQUIRED: 407,
      REQUEST_TIMEOUT: 408,
      CONFLICT: 409,
      GONE: 410,
      LENGTH_REQUIRED: 411,
      PRECONDITION_FAILED: 412,
      PAYLOAD_TOO_LARGE: 413,
      URI_TOO_LONG: 414,
      UN_SUPPORTED_MEDIA_TYPE: 415,
      RANGE_NOT_SATISFIABLE: 416,
      EXPECTATION_FAILED: 417,
      I_MA_TEAPOT: 418,
      MISDIRECTEDREQUEST: 421,
      UN_PROCESSABLE_CONETNT: 422,
      LOCKED: 423,
      FAILED_DEPENDENCY: 424,
      TOO_EARLY: 425,
      UPGRADE_REQUIRED: 426,
      PRE_CONDITION_REQUIRED: 428,
      TOO_MANY_REQUESTS: 429,
      REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
      UN_AVAILABLE_FOR_LEGAL_REASONS: 451,
    },
    SERVER_ERROR_RESPONSES: {
      INTERNAL_SERVER_ERROR: 500,
      NOT_IMPLEMENTED: 501,
      BAD_GATEWAY: 502,
      SERVICE_UN_AVAILABLE: 503,
      GATEWAY_TIMEOUT: 504,
      HTTP_VERSION_NOT_SUPPORTED: 505,
      VARIANT_ALSO_NEGOTIATES: 506,
      INSUFFICIENT_STORAGE: 507,
      LOOP_DIRECTED: 508,
      NOT_EXTENDED: 510,
      NETWORK_AUTHENTICATE_REQUIRED: 511,
    },
  },
};

```

* `errorHandler.js`
```js
const constant = require('../common/_constant').constant
const STATUS_CODE = constant.STATUS_CODE;

const getKeyByValue =(object, value) => {
    const key = Object.keys(object).find(key => object[key] === value)
    if(key.includes("_")) return key.split("_").join(" ");
    else return key;
}

const errorHandler = (err , req , res , next) =>{
    const statusCode = res.statusCode ? res.statusCode :500;
    // res.statusCode = returns your status code
    let response = {
        status:statusCode ,
        title:" ",
        message : err.message , 
        stackRace:err.stack
    }


    if(err){ // if we will get error then we send this message in response
        let obj = {};
        let val = null;

        switch (statusCode) {

            // Object.keys(object).find(key => object[key] === value)
            // "BAD_REQUEST_VALIDATION_ERROR".split("_").join(" ")
            // console.log(Object.keys(STATUS_CODE.SERVER_ERROR_RESPONSES).find(key => STATUS_CODE.SERVER_ERROR_RESPONSES[key] === STATUS_CODE.SERVER_ERROR_RESPONSES.INTERNAL_SERVER_ERROR))
            // CLIENT_ERROR_RESPONSES
            case STATUS_CODE.CLIENT_ERROR_RESPONSES.BAD_REQUEST_VALIDATION_ERROR:
                obj = STATUS_CODE.CLIENT_ERROR_RESPONSES;
                val =  STATUS_CODE.CLIENT_ERROR_RESPONSES.BAD_REQUEST_VALIDATION_ERROR;
                response.title = getKeyByValue(obj,val)
                break;
            case STATUS_CODE.CLIENT_ERROR_RESPONSES.UNAUTHORIZED:
                obj = STATUS_CODE.CLIENT_ERROR_RESPONSES;
                val =  STATUS_CODE.CLIENT_ERROR_RESPONSES.UNAUTHORIZED;
                response.title = getKeyByValue(obj,val)
                break;
            case STATUS_CODE.CLIENT_ERROR_RESPONSES.PAYMENT_REQUIRED:
                obj = STATUS_CODE.CLIENT_ERROR_RESPONSES;
                val =  STATUS_CODE.CLIENT_ERROR_RESPONSES.PAYMENT_REQUIRED;
                response.title = getKeyByValue(obj,val)
                break;
            case STATUS_CODE.CLIENT_ERROR_RESPONSES.FORBIDDEN:
                obj = STATUS_CODE.CLIENT_ERROR_RESPONSES;
                val =  STATUS_CODE.CLIENT_ERROR_RESPONSES.FORBIDDEN;
                response.title = getKeyByValue(obj,val)
                break;
            case STATUS_CODE.CLIENT_ERROR_RESPONSES.NOT_FOUND:
                obj = STATUS_CODE.CLIENT_ERROR_RESPONSES;
                val =  STATUS_CODE.CLIENT_ERROR_RESPONSES.NOT_FOUND;
                response.title = getKeyByValue(obj,val)
                break;
            case STATUS_CODE.CLIENT_ERROR_RESPONSES.METHOD_NOT_ALLOWED:
                obj = STATUS_CODE.CLIENT_ERROR_RESPONSES;
                val =  STATUS_CODE.CLIENT_ERROR_RESPONSES.METHOD_NOT_ALLOWED;
                response.title = getKeyByValue(obj,val)
                break;
            case STATUS_CODE.CLIENT_ERROR_RESPONSES.NOT_ACCEPTABLE:
                obj = STATUS_CODE.CLIENT_ERROR_RESPONSES;
                val =  STATUS_CODE.CLIENT_ERROR_RESPONSES.NOT_ACCEPTABLE;
                response.title = getKeyByValue(obj,val)
                break;
            // SERVER_ERROR_RESPONSES
            case STATUS_CODE.SERVER_ERROR_RESPONSES.INTERNAL_SERVER_ERROR:
                obj = STATUS_CODE.SERVER_ERROR_RESPONSES;
                val =  STATUS_CODE.CLIENT_ERROR_RESPONSES.INTERNAL_SERVER_ERROR;
                response.title = getKeyByValue(obj,val)
                break;
            default:
                response.title = "No Response"
                break;
        }
        res.json(response)
    }; 
    if(!err)res.json({name:"abhay"}); console.log("good dear")
}

module.exports = errorHandler;
```




# now we are going to interact with mongodb

* whenever we will interact with mongodb we will get a promise 
* to resolve the promise first we will make controller as async-function

* `contactController.js`

```js
// middleware

// @desc get all contacts
// @route GET /api/contacts
// @access public

const getFullContacts = async(req , res) => {
    res.status(200).json({"message":"getFullContacts  is working"});
}


// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContactById = async(req , res) => {
    res.status(200).json({"message":"getContactById  is working" , "id":req.params.id});
    // http://localhost:5000/api/contacts/id ex:- http://localhost:5000/api/contacts/2
}


// @desc Create new contacts
// @route POST /api/contacts
// @access public
const postContact = async(req , res) => {
    console.log("req.body ----------  " ,req.body)
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fiels are manadatory")
    }

    res.status(201).json({"message":"postContact  is working"});
}


// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContactById = async(req , res) => {
    res.status(200).json({"message":"updateContactById  is working", "id":req.params.id});
}


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContactById = async(req , res) => {
    res.status(200).json({"message":"deleteContactById  is working", "id":req.params.id});
}

module.exports = {
    getFullContacts , 
    getContactById , 
    postContact,
    updateContactById,
    deleteContactById
}
```

* whenever we use the `async` and if you want to catch an error we need to make use of `try-catch` block
* in order to do that `try-catch` block we have to `try-catch` block in each of the functions.
* but there is an method to do this , use of a middleware which is an express async handler
  * it is going to handle our exception , inside the async express routes.
  * then it will be pass them, to the express errorHandler
  * for this first install express async handler
## `install express async handler`  

* run following command to install express-async-handler
```js
npm i express-async-handler
``` 
## use of express async handler
* first wrap async function inside express-async-handler
* whenever exceoption is occured is going to pass with errorHandler


* `contactController.js`

```js
// middleware

const asyncHandler = require('express-async-handler');



// @desc get all contacts
// @route GET /api/contacts
// @access public

const getFullContacts = asyncHandler(async(req , res) => {
    res.status(200).json({"message":"getFullContacts  is working"});
})


// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContactById = asyncHandler(async(req , res) => {
    res.status(200).json({"message":"getContactById  is working" , "id":req.params.id});
    // http://localhost:5000/api/contacts/id ex:- http://localhost:5000/api/contacts/2
})


// @desc Create new contacts
// @route POST /api/contacts
// @access public
const postContact = asyncHandler(async(req , res) => {
    console.log("req.body ----------  " ,req.body)
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fiels are manadatory")
    }

    res.status(201).json({"message":"postContact  is working"});
})


// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContactById = asyncHandler(async(req , res) => {
    res.status(200).json({"message":"updateContactById  is working", "id":req.params.id});
})


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContactById = asyncHandler(async(req , res) => {
    res.status(200).json({"message":"deleteContactById  is working", "id":req.params.id});
})

module.exports = {
    getFullContacts , 
    getContactById , 
    postContact,
    updateContactById,
    deleteContactById
}
```

## set up mongodb
* set up mongodb atlas
* setup mongodb-vs code plugin
* mongodb cluster link :- 
```js
mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/
```

* mongodb dataBAse link :- 
```js
mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/dbName

// example
mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/myContactsBackend

```

## put connection string in `.env` file

```js
PORT = 5000
CONNECTION_STRING = 'mongodb+srv://freeWork:<password>@personalproject.ohw754o.mongodb.net/?retryWrites=true&w=majority'
CONNECTION_STRING_WITH_CLUSTER= "mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/?retryWrites=true&w=majority"
CONNECTION_STRING_WITH_CLUSTER_WITH_DB_NAME = "mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/dbNAme?retryWrites=true&w=majority"
```
* now we need a `mongoose` this is mongo design schema for our entity like contacts
  * and it helps us to communicate with our mongodb database

## create `config` folder , create `dbConnection.js` inside `config`
* here we create the connection with database

* `dbConnection.js`
```js
const mongoose = require('mongoose');

const connectDB = async(CONNECTION_STRING) => {
    try {
        const connect = await mongoose.connect(CONNECTION_STRING);
        console.log("Data base connecte with host" , connect.connection.host)
        console.log("Data base connecte with database name" , connect.connection.name)
    } catch (err) {
        console.log(err);
        process.exit(1) ; // if we have error then our process will be exit
    }
}

module.exports = {connectDB}
```

* `server.js`

```js
const express = require('express')
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler')
const {connectDB} = require('./config/dbConnection/dbConnection')

connectDB(process.env.CONNECTION_STRING); // database connected with database link
// process.env.CONNECTION_STRING ='mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/?retryWrites=true&w=majority'


const app = express()

const constant = require('./common/_constant').constant
const PORT = process.env.PORT || constant.PORT;



// use all the middleware here
app.use(express.json()) // this is inbuilt middleware // this is a body parser that parse the date stream which we receives from the client on the server side
app.use("/api/contacts" , require("./routes/contactRoutes")) // use routes   // syntax app.use('url' , routerFunction)
app.use(errorHandler) // this is middlware where we chnage error to json // this is a custom middleware which accepts req , resp then in between which is going to transform in between into json


// server
const serverConfirmation = (success , fail) =>{
    if(!fail) console.log("server is runnig success fully on " , PORT);
}
app.listen(PORT , serverConfirmation)
```


## then we create schema

### we create `model` folder, create `contactModel.js` inside `model`

* `contactModel.js`

```js
const mongoose = require("mongoose");

const contatcSchema = mongoose.Schema({
    /* 
    fieldName:{
        type:dataType,
        required : [flag , errorMessage] // flag= true or false 
    }
    */
    name:{
        type:String,
        required : [true , "please add the contact names"]
    },
    email:{
        type:String,
        required : [true , "please add the contact email address"]
    },
    phone:{
        type:String,
        required : [true , "please add the contact phone number"]
    }
},

{
    timestamps:true // to get time tamps about document in collecion in database
}

)
const contactModel = mongoose.model("Contact" , contatcSchema) 
module.exports = {contactModel}
```

### crud opeation with database

* `contactController.js`
```js
// middleware

const asyncHandler = require('express-async-handler');
const {contactModel} = require('../models/contactModel')


// @desc get all contacts
// @route GET /api/contacts
// @access public

const getFullContacts = asyncHandler(async(req , res) => {
    // console.log("getFullContacts is working")
    const contacts = await contactModel.find(); // get value from collection
    // res.status(200).json({"message":"getFullContacts  is working"});
    res.status(200).json(contacts);
})


// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContactById = asyncHandler(async(req , res) => {
    // res.status(200).json({"message":"getContactById  is working" , "id":req.params.id});
    // http://localhost:5000/api/contacts/id ex:- http://localhost:5000/api/contacts/2
    const contact = await contactModel.findById(req.params.id); // get value from collection

    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
})


// @desc Create new contacts
// @route POST /api/contacts
// @access public
const postContact = asyncHandler(async(req , res) => {
    console.log("req.body ----------  " ,req.body)
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fiels are manadatory")
    }
    const contacts = await contactModel.create({
        name,
        email,
        phone
    })

    res.status(201).json(contacts);
})


// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContactById = asyncHandler(async(req , res) => {
    // res.status(200).json({"message":"updateContactById  is working", "id":req.params.id});
    // first we will get contact
    const contact = await contactModel.findById(req.params.id); // get value from collection

    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
    
})


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContactById = asyncHandler(async(req , res) => {
    // res.status(200).json({"message":"deleteContactById  is working", "id":req.params.id});
    // first we will get contact
    const contact = await contactModel.findById(req.params.id); // get value from collection

    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await contactModel.findOneAndDelete( contact);
    res.status(200).json(contact);
})

module.exports = {
    getFullContacts , 
    getContactById , 
    postContact,
    updateContactById,
    deleteContactById
}
```

# Now we will do authentication part
