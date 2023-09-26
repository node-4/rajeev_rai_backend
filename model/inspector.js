const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const inspectorSchema = mongoose.Schema({
  inspectorName: {
    type: String,
  },
  accessrequest: {
    type: Boolean,
    default: false,
  },
  siteId: {
    type: objectid,
    ref: "site",
  },
  siteName: {
    type: String,
  },
  clientName: {
    type: String,
  },
  inspectionDate: {
    type: String,
  },
  reportstatus: {
    type: String,
    enum: ["yes", "no"],
  },
  siteAllocated: {
    type: Boolean,
    //default:false
  },
  role: {
    type: String,
    //enum: ["reviewer", "admin","auditor"],
    default: "inspector",
  },
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
});

const inspectorModel = mongoose.model("inspector", inspectorSchema);

module.exports = inspectorModel;
