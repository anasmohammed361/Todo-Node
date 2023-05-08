import { Router } from "express";
import passport from "passport";
import user from  "../model/user.js"

const authRoute = Router();

authRoute.post("/signup",(req,res)=>{
    if (req.body.username && req.body.password) {
        user.register(
                new user({
                    username:req.body.username
                }),
                req.body.password,
                (err,user)=>{
                    if(err){
                        console.log(err);
                        res.send(err.message);
                    }else{
                        passport.authenticate('local',{failureRedirect:"/login"})(req,res,()=>{
                            res.redirect("/home")
                        })
                    }
                }
        )
    } else {
        res.sendStatus(400)
    }
})

authRoute.post("/login",(req,res)=>{
    if (req.body.username && req.body.password) {
        const currentUser = new user({
            username:req.body.username,
            password:req.body.password
        });
        req.login(currentUser,(err)=>{
            if (err) {
                console.log(err);
                res.send(err.message)
            } else {
                passport.authenticate('local',{failureRedirect:"/login"})(req,res,()=>{
                    res.redirect("/home")
                })
            }
        });
    }else{
        res.sendStatus(400)
    }
})

authRoute.get("/signout",(req,res)=>{
    req.logOut((err)=>{
        if (err) {
            console.log(err);
            res.send(err.message);
        } else {
            res.redirect("/login")
        }
    })
})

export default authRoute;