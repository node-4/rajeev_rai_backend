const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId

const auditSchema = mongoose.Schema({
  siteId: {
    type: objectid,
    ref:"site"
  },
  siteName: {
    type: String,
  },
  inspectorName: {
    type: String,
  },
  clientName: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: String,
  },
  address: {
    type: String,
  },
  // auditRequirements: [
  //   {
  //     type: String,
  //   },
  // ],
  Status:{
    type:String,
   // enum:["pending","ongoing","completed"],
    default:"pending"
  },
  // uploadFileFromYourDevice: {
  //   type: String,
  // },
  checksheetid:{
    type:objectid,
    ref:"checkSheet"
  }
});

const auditModel = mongoose.model("audit", auditSchema);

module.exports = auditModel;
