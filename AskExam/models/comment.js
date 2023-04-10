const mongoose = require('mongoose')
const {Schema}=mongoose;
const commentSchema = new mongoose.Schema({

    description: 
    {
         type: String,
          required: true 
     },
    author: 
    { 
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    created: { 
        type: Date,
         default: Date.now
     },
   post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post',
   }



})
module.exports=postSchema;