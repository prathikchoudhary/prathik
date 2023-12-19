const listing = require("./model/listing.js");
const Review = require("./model/review.js");
const ExpressError = require("./utils/Express.js");
const {listingSchema ,reviewSchema} = require("./schema.js");

module.exports.isLoggedIN = (req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to Create Listing!");
        return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirect = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}


module.exports.isOwner = async(req,res,next)=>{
  let {id} = req.params;
  let listings = await listing.findById(id);
    if(!listings.owner.equals(res.locals.currUser._id)){
      req.flash("error","you don't have permission to acces");
      return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(404,errMsg);
  } else{
    next()
  }
};



module.exports.validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(404,errMsg);
  } else{
    next();
  }
};


module.exports.isReview = async(req,res,next)=>{
  let {id,reviewId} = req.params;
  let reviews = await Review.findById(reviewId);
    if(!reviews.author.equals(res.locals.currUser._id)){
      req.flash("error","you can't delete this Review");
      return res.redirect(`/listing/${id}`);
    }
    next();
}

