const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const checkSheetSchema = mongoose.Schema({
  siteId: {
    type: objectid,
    ref: "site"
  },
  checkSheetId: {
    type: objectid,
    ref: "checkSheet"
  },
  checkSheetQuestionId: {
    type: objectid,
    ref: "CheckSheetQuestion"
  },
  answer: {
    type: String,
  },
  photo: {
    type: String,
  },
  remarks: {
    type: String,
    default: ""
  },
});
const checkSheetModel = mongoose.model("reportCheckSheetQuestion", checkSheetSchema);
module.exports = checkSheetModel;
