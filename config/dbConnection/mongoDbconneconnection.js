const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://freeWork:kroWeerf@personalproject.ohw754o.mongodb.net/?retryWrites=true&w=majority";

dbCOnnect = (url, databaseName , collectionName) => {


  MongoClient.connect(url, function (err, db) {

    // connect with database
    if (err) throw err;
    var dbo = db.db(databaseName);


    // check collection exist or not
    // if not exist the create , other not create
    var collectionExists = database.ListCollectionNames().ToList().Contains(collectionName);
    if (collectionExists == false) {
      Console.WriteLine("Create Collection");
      // code to create the collection here...
      dbo.createCollection("customers", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    } else {
      Console.WriteLine("Collection Already Exists!!");
    }


    // 
    

    
  });


  
};
