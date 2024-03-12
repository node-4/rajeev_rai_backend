const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const checkSheetSchema = mongoose.Schema({
  checkSheetId: {
    type: objectid,
    ref: "checkSheet"
  },
  questionNo: {
    type: String,
    default: "",
  },
  question: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["Text", "Number", "Dropdown", "Data", "Photo", "Remark", "multiple"],
    default: "",
  },
  answerDropdown: [],
});

const checkSheetModel = mongoose.model("CheckSheetQuestion", checkSheetSchema);

module.exports = checkSheetModel;
