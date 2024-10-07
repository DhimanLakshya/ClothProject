const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    profileimg: { type: String, required: false, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    isDeleted: { type: String, default: false, trim: true }
    
    
},
    { timestamps: true }
)

module.exports = mongoose.model('userData', authorSchema);