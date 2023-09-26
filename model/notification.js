const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  message: { 
    type: String
 },
 date:{
    type:String
 },
 time:{
    type:String
 },
});

const notificationModel = mongoose.model("notification", notificationSchema);

module.exports = notificationModel;
