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
    timestamps:true
}

)
const contactModel = mongoose.model("Contact" , contatcSchema) 
// const contactModel = mongoose.model("collectionname" , documentschema) 
module.exports = {contactModel}



