import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    username:{
        type: String,
        required: [true, 'Please give your name']
    },
    password:{
        type: String,
        required:[true, 'Please give password']
    }
})

export default mongoose.models.userSchema || mongoose.model('user', userSchema)