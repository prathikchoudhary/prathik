const mongoose = require('mongoose');
const initdata = require("./data.js");
const listing = require("../model/listing.js");

const MONGO_URl = "mongodb://127.0.0.1:27017/websiteproject";

main().then(()=>{
    console.log("connection is succesful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URl);
}


const initdb = async () => {
    // await listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner: "6579a2c046d25c980e23f562"}));
    await listing.insertMany(initdata.data);
    console.log("working data")
}
initdb();