const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
       
    },
    repassword: {
        type: String,
    },
    repository:[{
        data:
        {
            type:Buffer,
        },
        contentType:String,
        title:String,
    },],
    score:[{
        type:String,
    }
    ],
    sic:{
        type:String,
    },
    mobileno:{
        type:String,
    },
    address:{
        type:String,
    },
    college:{
        type:String,
    },
    country:{
        type:String,
    },
    profile:{
        data:
        {
            type:Buffer,
        },
        contentType:String,
        
    }
    
})
module.exports=userSchema;