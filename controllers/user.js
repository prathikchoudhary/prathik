const user = require("../model/user.js");

module.exports.renderSignup = (req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.singUp = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        let newUser = new user({email,username});
        const reisterUser = await user.register(newUser,password);
        req.login(reisterUser,(err)=>{
            if(err){
                return next();
            }
            req.flash("success",`Welcome ${username}`)
            res.redirect("/listing")
        })
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin = (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success",`Welcome to Little House`);
    let redirect = res.locals.redirectUrl || "/listing";
    res.redirect(redirect);
};

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next();
        }
        req.flash("success","you are logged out");
        res.redirect("/listing");
    });
};