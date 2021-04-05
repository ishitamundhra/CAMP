const express = require ('express');
const path = require('path');
const mongoose = require('mongoose');
const { Console } = require('console');
const Campground = require('./models/campground');

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

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req , res)=>
{
    res.render('home');
})

app.get('/main',async (req , res)=>
{
    const camp = new Campground({title: 'My Backyard', description:'Cheap campground'});
    await camp.save();
    res.send(camp);
})


app.listen(3000,()=>
{
    console.log('Serving port 3000');
})