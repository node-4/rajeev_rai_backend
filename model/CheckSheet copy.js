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
  addQuestionForInspect: [
    {
      isAnswer: {
        type: String,
        default: "false",
      },
      question: {
        type: String,
        default: "",
      },
      type: {
        type: String,
        default: "",
      },
      answer: {
        type: String,
        default: "select",
      },
      photo: {
        type: String,
        default: ""
      },
      remarks: {
        type: String,
        default: ""
      },
      answerDropdown: [],
    },
  ],
  uploadDocument: {
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
  client: {
    type: String,
    default: "",
  },
  circle: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  auditDate: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: ""
  },
  submitted: {
    type: String,
    default: "false"
  }
});

const checkSheetModel = mongoose.model("checkSheet", checkSheetSchema);

module.exports = checkSheetModel;
