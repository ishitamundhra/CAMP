const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { Console } = require('console');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnigfiedTopology: true
    })

mongoose.connection.on("error", console.error.bind(Console, "Connection Error"));

mongoose.connection.once("open", () => {
    console.log("mongoose is connected")
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

app.get('/', (req, res) => {
    res.render('/home');
});

app.all('*', (err, req, res, next) => {
    console.log(err);
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "Oh No, Something Went Wrong";
    res.status(statusCode).render('\error', { err });

})

app.listen(3000, () => {
    console.log('Serving port 3000');
})