const express = require("express");
const router = express();
const wrapAsync = require("../utils/wrapacsy.js");
const { isLoggedIN, isOwner, validateListing } = require("../middelWare.js");
const listing = require("../model/listing.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIN,upload.single("list[image]"),validateListing,wrapAsync(listingController.createData))


  //New Route
  router.get("/new",isLoggedIN,(listingController.newRender));
  
router.route("/:id")
  .get(wrapAsync(listingController.showData))
  .put(isLoggedIN,isOwner,upload.single("list[image]"), validateListing,wrapAsync(listingController.upateData))
  .delete(isLoggedIN,isOwner,wrapAsync(listingController.deleteData));

router.route("/filter/room")
.get((listingController.filter))

  
    
  //Edit Route
  router.get("/:id/edit",isLoggedIN,isOwner,wrapAsync(listingController.editData));
  

  module.exports = router;