const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const siteSchema = mongoose.Schema({
  QA_CA_ID: {
    type: String,
    default:""
  },
   Client_email: {
    type: String,
    default:""
  },
  circle_state: {
    type: String,
    default:""
  },
  location:{
    type:String,
    default:""
  },
  siteId:{
    type:String,
    default:""
  },
  siteName: {
    type: String,
    default:""
  },
 site_address: {
    type: String,
    default:""
  },
   dateAllocated: {
    type: String,
    default:""
  },
  dueDate: {
    type: String,
    default:""
  },
  dateAuditScheduled: {
    type: String,
    default:""
  },
  InspectorName: {
    type: String,
    default:""
  },
  dateActualAudit: {
    type: String,
    default:""
  },
  reviewerName: {
    type: String,
    default:""
  },
  dateReviewed: {
    type: String,
    default:""
  },
  clientRepName: {
    type: String,
    default:""
  },
  DateClient: {
    type: String,
    default:""
  },
  uploadFileFromDevice: {
    type: String,
    default:""
  },
  checksheet:[],
});

const siteModel = mongoose.model("site", siteSchema);

module.exports = siteModel;
