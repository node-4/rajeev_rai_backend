const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    //required: [true, "Please Enter your First name"],
    default:""
  },
  // middleName: {
  //   type: String,
  //   required: [true, "Please enter your Middle Name."],
  // },
  // lastName: {
  //   type: String,
  //   required: [true, "Please enter your Last name."],
  // },
  employeeId: {
    type: String,
    default:""
  },
  email: {
    type: String,
    required: [true, "Please Enter your E-mail!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide your valid E-mail!"],
    default:""
  },
  phone: {
    type: String,
    default:""
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password!"],
    minlength: 8,
    select: false,
    default:""
  },
  confirmpassword: {
    type: String,
    default:""
  },
  dateOfBirth: {
    type: String,
    default:""
  },
  highestEducationQualification: {
    type: String,
    default:""
  },
  specialisation: {
    type: String,
    default:""
  },
  currentAddress: {
    type: String,
    default:""
  },
  permanentAddress: {
    type: String,
    default:""
  },
  bloodGroup: {
    type: String,
    default:""
  },
  emergencyContactNumber: {
    type: String,
    default:""
  },
  otp: {
    type: Number,
    default:123456
  },
  role: {
    type: String,
    //  enum: ["auditor", "admin"],
    default: "",
  },
  google_id: {
    type: String,
    default:""
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

  ////////////////////////////////////////////////

 
});


const User = mongoose.model("User", userSchema);

module.exports = User;
