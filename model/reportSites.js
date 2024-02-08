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
  siteId: {
    type: objectid,
    ref: "site"
  },
  dateAllocated: {
    type: Date,
  },
  dateAuditScheduled: {
    type: Date,
  },
  dateActualAudit: {
    type: String,
    default: ""
  },
  checksheet: [{
    type: objectid,
    ref: "checkSheet"
  }],
  reportCheckSheetQuestion: [{
    type: objectid,
    ref: "reportCheckSheetQuestion"
  }],
});
const siteModel = mongoose.model("reportSites", siteSchema);
module.exports = siteModel;
