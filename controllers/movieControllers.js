// middleware

const asyncHandler = require('express-async-handler');
const { moviesModel } = require('../models/moviesModel');


const defObjMovie = {
    "plot": "A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.",
    "genres": ["Short","Western"],
    "runtime": 11,
    "cast": ["A.C. Abadie","Gilbert M. 'Broncho Billy' Anderson","George Barnes","Justus D. Barnes"],
    "poster": "https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg",
    "title": "The Great Train Robbery",
    "fullplot": "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.",
    "languages": ["English"],
    "released": {
      "$date": {
        "$numberLong": "-2085523200000"
      }
    },
    "directors": ["Edwin S. Porter"],
    "rated": "TV-G",
    "awards": {
      "wins": 1,
      "nominations": 0,
      "text": "1 win."
    },
    "lastupdated": "2015-08-13 00:27:59.177000000",
    "year": 1903,
    "imdb": {
      "rating": 7.4,
      "votes": 9847,
      "id": 439
    },
    "countries": ["USA"],
    "type": "movie",
    "tomatoes": {
      "viewer": {
        "rating": 3.7,
        "numReviews": 2559,
        "meter": 75
      },
      "fresh": 6,
      "critic": {
        "rating": 7.6,
        "numReviews": 6,
        "meter": 100
      },
      "rotten": 0,
      "lastUpdated": {
        "$date": "2015-08-08T19:16:10.000Z"
      }
    },
    "num_mflix_comments": 0
  }


// @desc get all Movies
// @route GET /api/movies
// @access public

const getFullMovies = asyncHandler(async(req , res) => {
    console.log("getFullMovies is working")
    const Movies = await moviesModel.find(); // get value from collection
    // res.status(200).json({"message":"getFullMovies  is working"});
    console.log("Movies is working     " , Movies)

    res.status(200).json(Movies);
})


// @desc Get Movie
// @route GET /api/movies/:id
// @access public
const getMovieById = asyncHandler(async(req , res) => {
    // res.status(200).json({"message":"getMovieById  is working" , "id":req.params.id});
    // http://localhost:5000/api/Movies/id ex:- http://localhost:5000/api/Movies/2
    const movie = await moviesModel.findById(req.params.id); // get value from collection

    if(!movie){
        res.status(404);
        throw new Error("Movie Not Found");
    }
    res.status(200).json(movie);
})


// @desc Create new Movies
// @route POST /api/movies
// @access public
const postMovie = asyncHandler(async(req , res) => {
    console.log("req.body ----------  " ,req.body)
    const movie = await moviesModel.create(defObjMovie)
    res.status(201).json(movie);
})


// @desc Update Movie
// @route PUT /api/movies/:id
// @access public
const updateMovieById = asyncHandler(async(req , res) => {
    // res.status(200).json({"message":"updateMovieById  is working", "id":req.params.id});
    // first we will get Movie
    const movie = await moviesModel.findById(req.params.id); // get value from collection

    if(!movie){
        res.status(404);
        throw new Error("movie Not Found");
    }

    const updatedMovie = await moviesModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedMovie);
    
})


// @desc Delete Movie
// @route DELETE /api/movies/:id
// @access public
const deleteMovieById = asyncHandler(async(req , res) => {
    // res.status(200).json({"message":"deleteMovieById  is working", "id":req.params.id});
    // first we will get Movie
    const movie = await moviesModel.findById(req.params.id); // get value from collection

    if(!movie){
        res.status(404);
        throw new Error("Movie Not Found");
    }
    await moviesModel.findOneAndDelete( movie);
    res.status(200).json(movie);
})

module.exports = {
    getFullMovies , 
    getMovieById , 
    postMovie,
    updateMovieById,
    deleteMovieById
}