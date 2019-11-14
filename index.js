const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const mySchema = {
    title: "Troltilla",
    level: "UltraPro Chef",
    ingredients: ["troll", "tila"], // would this be the same as {type: Array}?
    cuisine: "Yes",
    dishType: "Other",
    image: "http://img.desmotivaciones.es/201101/trolltilladepatatas.jpg",
    duration: 225,
    creator: "Ivan",
    created: new Date()
  }
var trolltilla = Recipe.create(mySchema)
console.log(mySchema.title)

Recipe.insertMany(data)
data.forEach(element => {
  console.log(element.title);
});

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, {$set:{ duration: 100 }})
.then(result=>{
  console.log("Succeded updating one element")
})
.catch(err=>{
  console.log(err)
})

Recipe.deleteOne({ title: 'Carrot Cake' }, ()=>{}) //It is not actually deleted, I think
.then(result=>{
  console.log("Succeded deleting one element")
})
.catch(err=>{
  console.log(err)
})


mongoose.connection.on('connected', () => console.log('Mongoose connected'));

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// If the connection throws an error
mongoose.connection.on('error', (err) => console.log('Mongoose connection error: ' + err));

process.on('SIGINT', () => {   //this is not running and "mongoose.connection.close()" throws error
  mongoose.connection.close(() => { 
    console.log('Mongoose connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});