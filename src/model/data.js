import mongoose, { Schema,model } from "mongoose";
const dataSchema = new Schema({
    todos:[
        {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        done:{
            type:Boolean,
            required:true
        }
    }
]
})

export default new model('Todo',dataSchema)