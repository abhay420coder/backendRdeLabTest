const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
    /* 
    fieldName:{
        type:dataType,
        required : [flag , errorMessage] // flag= true or false 
    }
    */
    plot:{
        type:String,
        required : [false , "please add the plot"]
    },
    genres:{ 
        type:Array,
        required : [false , "please add the genres"]
    },
    runtime:{
        type:Number,
        required : [false , "please add the runtime"]
    },
    cast:{
        type:Array,
        required : [false , "please add the plot"]
    },
    poster:{ 
        type:String,
        required : [false , "please add the poster"]
    },
    title:{
        type:String,
        required : [false , "please add the title"]
    },
    fullplot:{
        type:String,
        required : [false , "please add the fullplot"]
    },
    languages:{ 
        type:Array,
        required : [false , "please add the languages"]
    },
    released:{
        type:Object,
        required : [false , "please add the released"]
    },
    directors:{
        type:Array,
        required : [false , "please add the directors"]
    },
    rated:{ 
        type:String,
        required : [false , "please add the rated"]
    },
    awards:{
        type:Object,
        required : [false , "please add the awards"]
    },
    lastupdated:{
        type:String,
        required : [false , "please add the lastupdated"]
    },
    year:{ 
        type:Number,
        required : [false , "please add the year"]
    },
    imdb:{
        type:Object,
        required : [false , "please add the imdb"]
    },
    countries:{
        type:Array,
        required : [false , "please add the countries"]
    },
    type:{ 
        type:String,
        required : [false , "please add the type"]
    },
    tomatoes:{
        type:Object,
        required : [false , "please add the tomatoes"]
    },
    num_mflix_comments:{
        type:Number,
        required : [false , "please add the fullplot"]
    },
},

// {
//     timestamps:true
// }

)
const moviesModel = mongoose.model("Movie" , moviesSchema) 
// const modelName = mongoose.model("collectionname" , documentschema) 
module.exports = {moviesModel}







/* 

{
  "_id": {
    "$oid": "573a1390f29313caabcd42e8"
  },
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
*/











