import { Router } from "express";
const apiRoute =  Router();

apiRoute.route("/")
.get(async(req,res)=>{
    if(req.isAuthenticated()){
        // req.user;
    }
})
.post(async(req,res)=>{
    if(req.isAuthenticated()){
        // req.user
    }
})