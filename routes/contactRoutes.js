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


/* 
const routing = (obj)=>{
    router.route('/').get(obj.getFullData).post(obj.postData)
    router.route('/:id').get(obj.getDataById).put(obj.updateDataById).delete(obj.deleteDataById)
}
module.exports = {routing}; 
*/
  

router.route('/').get(getFullContacts).post(postContact)
router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById)
module.exports = router;