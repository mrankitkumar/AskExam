const mongoose=require('mongoose');
const {Schema}=mongoose;
const questionSchema = new mongoose.Schema({
    question:{
        type: String,
        require: true,
        unique: true,
    },
    option1:{
        type: String,
        required: true,
        unique:false,
    },
    option2: {
        type: String,
        required: true,
        unique:false,
        
    },
    option3: {
        type: String,
        required: true,
        unique:false,
        
    },
    option4:{
        type: String,
        required: true,
        unique:false,
        
    },
    answer:{
        type: String,
        required: true,
        unique:false,
    },
    
    
})
module.exports=questionSchema;