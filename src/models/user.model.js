const mongoose = require('mongoose');

//Forma del objeto en la bd
const userSchema = new mongoose.Schema(
    {
        name: String, 
        age: Number,
        email: String,   
    }
)

// Exportacion como modelo
module.exports = mongoose.model('User', userSchema);