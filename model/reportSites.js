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
  submitted: {
    type: Boolean,
    default: false,
  },
  checkSheetQuestion: [{
    isAnswer: {
      type: Boolean,
      default: false,
    },
    reportCheckSheetQuestionId: {
      type: objectid,
      ref: "reportCheckSheetQuestion"
    },
  }],
  checksheet: {
    type: objectid,
    ref: "checkSheet"
  },
});
const siteModel = mongoose.model("reportSites", siteSchema);
module.exports = siteModel;
