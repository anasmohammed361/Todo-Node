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
                res.sendStatus(400)
                console.log("Failed to identify a id");
            }
        } catch (error) {
            res.sendStatus(500)
        }
        
    }
})
.post(async(req,res)=>{
    if(req.isAuthenticated()){
        const user = req.user;
        if(req.user.dataId && req.body.title && req.body.content){
            const obj = {
                title:req.body.title,
                content:req.body.content,
                done:false}
            const data =await  dataModel.findOne({_id:req.user.dataId});
            data.todos.push(obj);
            await data.save();
            res.json(data.todos);
        }else{
            console.log("Failed to Identify a id");
            
            console.log(req.body);
            const obj = new dataModel({
                todos:[
                    {
                    title:req.body.title,
                    content:req.body.content,
                    done:false}
                ]
            }) 
            await obj.save()
            user.dataId = obj._id;
            await user.save();
            res.json(obj.todos);
        }
    }
})
.delete(async (req,res)=>{
    if (req.isAuthenticated()) {
        const user = req.user;
        if(user.dataId && req.body.itemId){
            const data =await dataModel.findOne({_id:user.dataId});
            await data.todos.pull({_id:req.body.itemId})
            await data.save()
            console.log(data.todos);
            res.json(data.todos)
        }else{
            res.sendStatus(400)
        }
    }else{
        res.sendStatus(400)
    }
})
.patch(async(req,res)=>{
    if(req.isAuthenticated()){
        const user = req.user;
        if(user.dataId && req.body.itemId){
            const data = await dataModel.findOne({_id:user.dataId});
            const item = data.todos.filter((e)=>e._id == req.body.itemId)[0] ;
            item.done = ! item.done;
           await data.save()
            res.json(data.todos)
        }
    }
})

export default apiRoute