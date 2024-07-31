const mongoose = require("mongoose")

const generatedSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    content:{
        type:String,
        required:true
    },
    createdAt:{ 
     type: Date, 
     default: Date.now 
    },
    updatedAt: { 
     type: Date, 
     default: Date.now 
    },
})

module.exports = mongoose.model("Generated",generatedSchema)