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