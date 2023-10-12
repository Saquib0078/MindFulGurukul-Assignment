const mongoose = require('mongoose');

// Create a Mongoose schema
const AddUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/, 
  },
  email: {
    type: String,
    required: true,
    unique:true,
    match: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, 
  },
  mobile: {
    type: String,
    required: true,
    unique:true,
    match: /^[0-9]+$/, 
  },
  isDeleted:{
    type:Boolean,
    default : false
  },
  UpdatedAt:{
    type:Date,
    default:Date.now
  }
});

const AddUSer = mongoose.model('AddUser', AddUserSchema);

module.exports = AddUSer;
