const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const checkSheetSchema = mongoose.Schema({
  nameOfCheckSheet: {
    type: String,
    default: "",
  },
  revisionNumber: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  siteId: {
    type: objectid,
    ref: "site",
  },
  clientId: {
    type: objectid,
    ref: "User"
  },
  CheckSheetQuestionId: [{
    type: objectid,
    ref: "CheckSheetQuestion",
  }],
  submitted: { type: String, default: "false" }
});
const checkSheetModel = mongoose.model("checkSheet", checkSheetSchema);
module.exports = checkSheetModel;
