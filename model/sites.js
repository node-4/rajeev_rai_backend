const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const siteSchema = mongoose.Schema({
  clientId: {
    type: objectid,
    ref: "User"
  },
  auditorId: {
    type: objectid,
    ref: "User"
  },
  reviewerId: {
    type: objectid,
    ref: "User"
  },
  QACA_Activity_Type: {
    type: String,
    default: ""
  },
  QACA_Product: {
    type: Array,
    default: ""
  },
  QA_CA_ID: {
    type: String,
    default: ""
  },
  Client_email: {
    type: String,
    default: ""
  },
  circle_state: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  siteId: {
    type: String,
    default: ""
  },
  siteName: {
    type: String,
    default: ""
  },
  site_address: {
    type: String,
    default: ""
  },
  dateAllocated: {
    type: Date,
  },
  dueDate: {
    type: String,
    default: ""
  },
  dateAuditScheduled: {
    type: Date,
  },
  DateClient: {
    type: Date,
    default: ""
  },
  dateActualAudit: {
    type: String,
    default: ""
  },
  InspectorName: {
    type: String,
    default: ""
  },
  reviewerName: {
    type: String,
    default: ""
  },
  dateReviewed: {
    type: String,
    default: ""
  },
  clientRepName: {
    type: String,
    default: ""
  },
  uploadFileFromDevice: {
    type: String,
    default: ""
  },
  checksheet: [{
    type: objectid,
    ref: "checkSheet"
  }],
});
const siteModel = mongoose.model("site", siteSchema);
module.exports = siteModel;
