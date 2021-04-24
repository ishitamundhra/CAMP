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

app.use(express.urlencoded({extended: true }))

app.get('/',(req , res)=>
{
    res.render('home');
});

app.get('/campgrounds',async (req , res)=>
{
    const campgrounds= await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
});

app.get('/campgrounds/new', (req,res) =>{
    res.render('campgrounds/new');
})

app.post('/campgrounds',async(req,res)=>{
    const campground= new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id', async(req, res)=>
{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{campground});
    
});

app.listen(3000,()=>
{
    console.log('Serving port 3000');
})