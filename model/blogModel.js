import mongoose from "mongoose";
const Schema = mongoose.Schema;
//creating the user schema
let postSchema = new Schema({
    title : {
        type : String, 
        required : true,
    }, post : { 
        type : String, 
        required : true,
    }
  
})

export default mongoose.model("Post",postSchema);