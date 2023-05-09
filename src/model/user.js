import mongoose ,{ Schema, model } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
import passportFindOrCreatePlugin from "mongoose-findorcreate"
//Schema
const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    googleId:{
        type:String
    },
    photoUrl:{
        type:String
    },
    dataId:{
        type:mongoose.ObjectId,
        ref:'Todo'
    }
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(passportFindOrCreatePlugin)
//Model
export default new model("User",userSchema);

