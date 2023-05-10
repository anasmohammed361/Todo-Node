//Express
import express,{urlencoded,json} from "express";
import session from "express-session";
//Routes
import authRoute from "./src/routes/auth.js";
import googleRoute from "./src/routes/google.js"
import apiRoute from "./src/routes/api.js"
//normal packages
import { config } from "dotenv";
import { fileURLToPath } from 'url';
import { dirname,join } from 'path';
//Mongoose
import { connect } from "mongoose";
//Passport
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
//Models
import user from "./src/model/user.js";



const app = express();
config();

//Database connection
const uri = process.env.DB_URI

connect(uri).then(()=>{
    console.log("Db connected");
}).catch((err)=>{
    console.log(err);
})
//Setup variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Express Middleware

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        sameSite:true
    }
}))

app.use(urlencoded({extended:true}))
app.use(json())
app.use(passport.initialize())
app.use(passport.session())
//Set Template engine
app.set('views',join(__dirname,"src/views"))
app.set('view engine','ejs')
app.use('/dist',express.static(join(__dirname,'dist')))
app.use("/public",express.static(join(__dirname,'src/public')))


//Passport Configuration
passport.use(user.createStrategy())
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        done(null,user)
    }).catch(err=>{
        done(err,null)
    })
})

//Passport Configuration for Google Oauth 
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    user.findOrCreate({ googleId: profile.id,username: profile.displayName ,photoUrl:profile.photos[0]["value"]}, function (err, user) {
      return cb(err, user);
    });
  }
));

//Mounting Routes 
app.use("/auth",authRoute);
app.use("/auth/google",googleRoute)
app.use("/api",apiRoute)


app.get("/",(req,res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/home')
    }else{
        res.redirect('/login')
    }
})

app.get("/signup",(req,res)=>{
    if (req.isAuthenticated()) {
            res.redirect('/home')
    }else
    res.sendFile("src/Html/signup.html",{root:__dirname})
})

app.get("/login",(req,res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/home')
    }else
    res.sendFile("src/Html/login.html",{root:__dirname})
})

app.get("/home",(req,res)=>{
    if(req.isAuthenticated()){
        const user = req.user;
        res.render('home',{username:user.username,photoUrl:user.photoUrl})
    }else{
        res.redirect("/login")
}})

app.listen("3000",()=>{
    console.log("Server running on port 3000");
})