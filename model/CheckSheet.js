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
      photo:{
        type:String,
        default:""
      },
      remarks:{
        type:String,
        default:""
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
  siteName: {
    type: String,
    default: "",
  },
  QA_CA_ID: {
    type: String,
    default: "",
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
  // location:{
  //   type:String,
  //   default:""
  // },
  location: {
    type: {
      type: String,
      // enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  inspectorid: {
    type: objectid,
    ref: "User",
  },
  submitted:{
    type:String,
    default:"false"
  }
});

const checkSheetModel = mongoose.model("checkSheet", checkSheetSchema);

module.exports = checkSheetModel;
