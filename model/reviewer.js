const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId

const reviewerSchema = mongoose.Schema({
 
  auditId:{
    type:objectid,
    ref:"audit"
  },
  reviewerId: {
    type: String,
  },
  reviewerName: {
    type: String,
  },
  auditRequirements: [{
    type: String,
  }],
  address: {
    type: String,
  },
  uploadFileFromYourDevice:{
    type:String
  },
  reviewStatus :{
    type:Boolean,
    default:false
  },
  reviewRemarks:{
    type:String
  },
  circle:{
    type:String
  },
  role: {
    type: String,
    //enum: ["reviewer", "admin","auditor"],
    default: "reviewer",
  },
});

const reviewerModel = mongoose.model("reviewer", reviewerSchema);

module.exports = reviewerModel;
