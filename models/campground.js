const mongoose = require('mongoose');
const Review = require('./review');

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

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);

