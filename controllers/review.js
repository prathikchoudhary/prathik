const Review = require("../model/review.js");
const ExpressError = require("../utils/Express.js");
const listing = require("../model/listing.js");

module.exports.createReview = async(req,res)=>{
    let listings = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    listings.reviews.push(newReview);
    await newReview.save();
    await listings.save();
    req.flash("success","New Review is Added!");
    res.redirect(`/listing/${listings._id}`)
};

module.exports.destoryReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review is Deleted!");
    res.redirect(`/listing/${id}`);
};