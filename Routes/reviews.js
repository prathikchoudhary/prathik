const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapacsy.js");
const ExpressError = require("../utils/Express.js");
const Review = require("../model/review.js");
const listing = require("../model/listing.js");
const {validateReview, isLoggedIN,isReview} = require("../middelWare.js");
const reviewController = require("../controllers/review.js");



// Create review connting to listing   
router.post("/",isLoggedIN, validateReview,wrapAsync(reviewController.createReview));
  
  // delte review routes
  // delete to side listing review obect id and review data
  
  router.delete("/:reviewId",isReview,wrapAsync(reviewController.destoryReview));

module.exports = router;