if(process.env.NODE_EVN != "production"){
  require('dotenv').config()
}
const listing = require("./model/listing.js")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/Express.js");
const session = require("express-session");
const MongoStore = require('connect-mongo')
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./model/user.js");

const listingRouter = require("./Routes/listing.js");
const reviewRouter = require("./Routes/reviews.js");
const userRouter = require("./Routes/user.js");


const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connection is succesful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}


app.set("views","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error",()=>{
  console.log("Error in Mongo Session store",err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  },
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listing",listingRouter);
app.use("/listing/:id/reviews",reviewRouter);
app.use("/",userRouter);

// review Routes



app.get("/Trending/:id",(req,res)=>{
  
});


app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page Not foumd"));
});

app.use((err,req,res,next)=>{
  let {stautsCode = 500,message = "something is wrong"} = err;
  res.status(stautsCode).render("err.ejs",{err});
  // res.status(stautsCode).send(message);
});

app.listen(8080,()=>{
    console.log("website listenig")
});