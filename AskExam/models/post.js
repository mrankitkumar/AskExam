const mongoose = require('mongoose')
const {Schema}=mongoose;

const postSchema = new mongoose.Schema({

    description: 
    {
         type: String,
          required: true 
     },
    author: 
    { 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    created: { 
        type: Date,
         default: Date.now
     },
    updated: { 
        type: Date, 
        default: Date.now 
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    comments: [{ 
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      createdAt: { type: Date, default: Date.now }
    }]



})
module.exports=postSchema;