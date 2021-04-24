const mongoose = require('mongoose');
const { Console } = require('console');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelper');

mongoose.connect('mongodb://localhost:27017/yelp-camp', 
   { useNewUrlParser : true,
    useCreateIndex : true,
    useUnigfiedTopology : true
   })

mongoose.connection.on("error",console.error.bind(Console,"Connection Error"));
  
mongoose.connection.once("open", () =>
{
    console.log("mongoose is connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i =0 ;i<50;i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});