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
  InspectorName: {
    type: String,
    default: ""
  },
  dateActualAudit: {
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
  DateClient: {
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
