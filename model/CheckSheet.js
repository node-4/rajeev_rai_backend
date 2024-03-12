const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const checkSheetSchema = mongoose.Schema({
  nameOfCheckSheet: {
    type: String,
    default: "",
  },
  revisionNumber: {
    type: Number,
    default: 1,
  },
  id: {
    type: String,
    default: "",
  },
  CheckSheetQuestionId: [{
    type: objectid,
    ref: "CheckSheetQuestion",
  }],
  submitted: { type: String, default: "false" }
});
const checkSheetModel = mongoose.model("checkSheet", checkSheetSchema);
module.exports = checkSheetModel;
