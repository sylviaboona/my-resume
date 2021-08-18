const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: 'Please Enter Email' 
    },
    question:String,
  });

  module.exports = mongoose.model('ContactForm', contactSchema);