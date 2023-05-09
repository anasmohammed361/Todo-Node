import { Router } from "express";
const apiRoute =  Router();
import dataModel from "../model/data.js";
apiRoute.route("/")
.get(async(req,res)=>{
    if(req.isAuthenticated()){
        try {
            if(req.user.dataId){
                console.log("Has an existing id");
                const data  =await dataModel.findOne({_id:req.user.dataId})
                res.json(data.todos)
            }else{
                res.send(400)
                console.log("Failed to identify a id");
            }
        } catch (error) {
            res.send(500)
        }
        
    }
})
.post(async(req,res)=>{
    if(req.isAuthenticated()){
        if(req.user.dataId){
            console.log("Has an existing id");
        }else{
            console.log("Failed to Identify a id");
            const user = req.user;
            console.log(req.body);
            const obj= new dataModel({
                todos:[
                    {
                title:"Title",
                content:"Content",
                done:false}
            ]
            }) 
            await obj.save()
            req.user.dataId = obj._id;
            await req.user.save()
        }
    }
})

export default apiRoute