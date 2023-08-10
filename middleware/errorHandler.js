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
    if(!err){ 
        // res.json({name:"abhay"}); 
        console.log("no error in error handling")
    }
}

module.exports = errorHandler;


/* 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://freeWork:<password>@personalproject.76t5fyk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

*/