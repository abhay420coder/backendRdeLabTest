const express = require('express')
const router = express.Router();

const {getFullMovies,getMovieById,postMovie,updateMovieById,deleteMovieById} = require('../controllers/movieControllers')

// routing

/* 
router.route('/').get(getFullMovies)
router.route('/').post(postMovie)
router.route('/:id').get(getMovieById)
router.route('/:id').put(updateMovieById)
router.route('/:id').delete(deleteMovieById) 


// works same as

router.route('/').get(getFullMovies).post(postMovie)
router.route('/:id').get(getMovieById).put(updateMovieById).delete(deleteMovieById)
*/


/* 
const routing = (obj)=>{
    router.route('/').get(obj.getFullData).post(obj.postData)
    router.route('/:id').get(obj.getDataById).put(obj.updateDataById).delete(obj.deleteDataById)
}
module.exports = {routing}; 
*/
  

router.route('/').get(getFullMovies).post(postMovie)
router.route('/:id').get(getMovieById).put(updateMovieById).delete(deleteMovieById)
module.exports = router;