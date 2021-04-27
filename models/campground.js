const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CampgroundSchema = new schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Campground', CampgroundSchema);

