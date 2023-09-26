const mongoose = require("mongoose");

const helpSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone:{type: String},
  enquiry:{type: String},
  
});

const helpModel = mongoose.model("help", helpSchema);

module.exports = helpModel;
