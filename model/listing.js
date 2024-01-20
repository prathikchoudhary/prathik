const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listenigSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type : String,
    },
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    cartegorey: {
        type: [String],
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Reviews"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry:{
          type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    },
});

// deleting listing reviews and review imporatant
listenigSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});

const listing = mongoose.model("listing",listenigSchema);
    
module.exports = listing;