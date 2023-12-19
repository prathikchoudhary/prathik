const listing = require("../model/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});

module.exports.index = async(req,res,next)=>{
    const listings = await listing.find({}).populate("owner");
    res.render("listings/index.ejs",{listings});
};

module.exports.newRender = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showData =async(req,res,next)=>{
    let {id} = req.params;
    let listeng = await listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listeng){
      req.flash("error","Listing you requester for does not exist");
      res.redirect("/listing")
    }
    res.render("listings/showall.ejs",{listeng});
};

module.exports.createData = async(req,res,next)=>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.list.location,
        limit:1,
    })
    .send(); 

    let url = req.file.path;
    let filename = req.file.filename;

    const newlisting = new listing(req.body.list);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    newlisting.geometry = response.body.features[0].geometry;
    let savelisting = await newlisting.save();
    console.log(savelisting);
    req.flash("success","New Listing is Created!");
    res.redirect("/listing");
};

module.exports.editData = async(req,res,next)=>{
    let {id} = req.params;
    let listeng = await listing.findById(id);
    if(!listeng){
      req.flash("error","Listing you requester for does not exist");
      res.redirect("/listing")
    }
    let originalImage = listeng.image.url;
    originalImage = originalImage.replace("/upload","/upload/h_40,w_80");
    res.render("listings/edit.ejs",{listeng,originalImage});
};

module.exports.upateData = async(req,res,next)=>{
    let {id} = req.params;
    let listings = await listing.findByIdAndUpdate(id ,{...req.body.list});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listings.image = {url,filename};
        await listings.save();
    }
    req.flash("success","Listing is Updated!");
    res.redirect(`/listing/${id}`);
};

module.exports.deleteData = async(req,res,next)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing is Deleted!");
    res.redirect("/listing");
};