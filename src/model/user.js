import { Schema, model } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
import passportFindOrCreatePlugin from "mongoose-findorcreate"
//Schema
const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    googleId:{
        type:String
    },
    photoUrl:{
        type:String
    },
    userData:{
        type:Map
    }
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(passportFindOrCreatePlugin)
//Model
export default new model("User",userSchema);

