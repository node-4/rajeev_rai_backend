const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
  inspectorName: {
    type: String,
  },
  accessrequest: {
    type: Boolean,
    default: false,
  },
  siteName: {
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
  reviewerId: {
    type: String,
  },
  reviewerName: {
    type: String,
  },
  auditRequirements: [{
    type: String,
  }],
  address: {
    type: String,
  },
  gstNo: {
    type: String,
  },
  uploadFileFromYourDevice: {
    type: String
  },
  reviewStatus: {
    type: Boolean,
    default: false
  },
  reviewRemarks: {
    type: String
  },
  circle: {
    type: String
  },
  clientName: {
    type: String,
  },
  designation: {
    type: String,
  },
  circle_state: {
    type: String,
  },
  representativeName: {
    type: String,
  },
  fullName: {
    type: String,
    //required: [true, "Please Enter your First name"],
    default: ""
  },
  employeeId: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
    default: ""
  },
  dateOfBirth: {
    type: String,
    default: ""
  },
  highestEducationQualification: {
    type: String,
    default: ""
  },
  specialisation: {
    type: String,
    default: ""
  },
  currentAddress: {
    type: String,
    default: ""
  },
  permanentAddress: {
    type: String,
    default: ""
  },
  bloodGroup: {
    type: String,
    default: ""
  },
  emergencyContactNumber: {
    type: String,
    default: ""
  },
  otp: {
    type: Number,
    default: 123456
  },
  role: {
    type: String,
    enum: ["admin", "auditor", "client", "reviewer", "subAdmin",],
    default: "",
  },
  auditorStatus: {
    type: String,
    enum: ["Pending", "Accept", "Reject",],
  },
  status: {
    type: String,
    enum: ["Active", "Block"],
    default: "Active"
  },
  google_id: {
    type: String,
    default: ""
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  permissions: {

  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;
