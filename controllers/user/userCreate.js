const jwt = require("jsonwebtoken");
const validator = require("validator");
const nodemailer = require("nodemailer");
const User = require("../../model/userCreate");
const bcrypt = require("bcryptjs");
const JWT_EXPIRES_IN = "1d";
require("dotenv").config();

const signToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.role);
  return res.status(statusCode).json({ status: "success", token, user, otp: user.otp, });
};
module.exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const verifyOtp = await User.findOne({ otp: otp, });
    if (!verifyOtp || verifyOtp.length == 0) {
      return res.status(400).json({ msg: "invalid otp" });
    } else {
      const data = { id: verifyOtp._id, phone: verifyOtp.phone };
      console.log(data);
      const token = jwt.sign(
        { id: verifyOtp._id.toString() },
        process.env.NODE_ENV,
        {
          expiresIn: "1d",
        }
      );
      console.log(token);
      res.setHeader("x-api-key", /* "Bearer "*/ +token);
      return res
        .status(200)
        .json({ msg: "signIn successfull", data: data, Token: token });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};
exports.loginWithPhone = async (req, res) => {
  try {
    const phone = await User.findOne({ phone: req.body.phone, role: "auditor", status: "Active" });
    if (phone) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      let update = await User.findByIdAndUpdate({ _id: phone._id }, { $set: { otp: otp } }, { new: true });
      return res.status(200).send({ msg: "true", update });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      req.body.otp = otp;
      req.body.role = "auditor";
      req.body.auditorStatus = "Pending";
      const newUser = await User.create(req.body);
      return res.status(200).send({ msg: "true", newUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email, role: req.body.role });
    if (email) return res.status(200).send({ msg: "email already present " });
    const salt = await bcrypt.genSalt(10);
    if (req.body.password == (null || undefined)) {
      res.status(201).send({ msg: "Please provide password " });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.body.confirmpassword == (null || undefined)) {
      res.status(201).send({ msg: "Please provide confirmpassword " });
    } else {
      req.body.confirmpassword = await bcrypt.hash(req.body.confirmpassword, salt);
    }
    req.body.role = req.body.role;
    req.body.auditorStatus = "Pending";
    const newUser = await User.create(req.body);
    return res.status(200).send({ msg: "true", newUser });
    //   await new Email(newUser, url).sendWelcome();

    //createSendToken(newUser, 201, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
module.exports.getAll = async (req, res) => {
  try {
    const sites = await User.find({});
    return res.json(sites);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getUserById = async (req, res) => {
  try {
    const site = await User.findById(req.params.id);
    if (site == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    return res.json({ msg: site });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const site = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, });
    if (!site) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json(site);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.login = async (req, res, next) => {
  const { input, password } = req.body;
  if (!input || !password) {
    return res.status(400).send("Please provide e-mail and password!");
  }

  if (validator.isEmail(input)) {
    var email = input;

    const user = await User.findOne({ email: email, role: "auditor", status: "Active" }).select("+password");
    console.log(user.password);

    if (!user /*|| !(await user.correctPassword(password, user.password))*/) {
      return res.status(400).send("Incorrect Email");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(404).send("Invalid email or password");
    }

    // const otp = Math.floor(Math.random() * 10000 + 1);
    // console.log(otp);
    // user.otp = otp;
    // await user.save();
    // console.log("USer", user);

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } else {
    var phone = input;
    const user = await User.findOne({ phone: phone }).select("+password");
    console.log(user.password);
    if (!user /*|| !(await user.correctPassword(password, user.password))*/) {
      return res.status(400).send("Incorrect Phone");
    }
    const otp1 = Math.floor(Math.random() * 10000 + 1);
    console.log("OTP", otp1);
    user.otp = otp1;

    await user.save();
    console.log("USer", user);

    createSendToken(user, 200, res);
  }
};
exports.verifyotp = async (req, res) => {
  try {
    const { /*phone,*/ otp } = req.body;
    const verifyOtp = await User.findOne({ otp: otp, });
    if (!verifyOtp || verifyOtp.length == 0) {
      return res.status(400).json({ msg: "invalid otp" });
    } else {
      // const data = { _id: verifyOtp._id, phone: verifyOtp.phone };
      // const token = jwt.sign(
      //   {id: verifyOtp._id.toString() },
      //    process.env.KEY,
      //   {
      //     expiresIn: "1d",
      //   }
      // );
      // console.log(token);
      // res.setHeader("x-api-key", /* "Bearer "*/ +token);
      createSendToken(verifyOtp, 200, res);

      // return res.status(200).json({ msg: "signIn successfull", data: verifyOtp /* Token: token*/ });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};
exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if the admin exists
    const admin = await User.findOne({ email, status: "Active" });
    if (!admin) return res.status(404).json({ message: " not found" });

    // Generate a random password
    //const newPassword = password//Math.random().toString(36).slice(-8);

    // Send password reset email
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: '',
    //     pass: ''
    //   }
    // });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    await admin.save();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "sandy.anderson@ethereal.email",
        pass: "K26Eg8zmEvkHuAYBYm",
      },
    });

    const mailOptions = {
      from: "node3@flyweis.technology",
      to: email,
      subject: "hello",
      text: `Your new password is ${otp}. Please login and change your password as soon as possible.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res.json({ msg: admin });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updateLocationofUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({ status: 404, message: "user not found" });
    } else {
      var location;
      if (req.body.currentLat && req.body.currentLong) {
        console.log(req.body.currentLong);
        let coordinates = [req.body.currentLat, req.body.currentLong];
        console.log(coordinates);
        location = { type: "Point", coordinates };
        console.log("--------------------", location);
        let update = await User.findByIdAndUpdate(
          { _id: user._id },
          { $set: { location: location } },
          { new: true }
        );
        if (update) {
          res.status(200).send({
            status: 200,
            message: "Location update successfully.",
            data: update,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};
exports.updateAuditorKyc = async (req, res) => {
  try {
    const site = await User.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ message: "Cannot find User" });
    } else {
      const site1 = await User.findByIdAndUpdate({ _id: site._id }, { $set: { auditorStatus: req.body.auditorStatus } }, { new: true });
      return res.json(site1);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.updateUserType = async (req, res) => {
  try {
    const site = await User.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ message: "Cannot find User" });
    } else {
      const site1 = await User.findByIdAndUpdate({ _id: site._id }, { $set: { role: req.body.role } }, { new: true });
      return res.json(site1);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.updateUserStatus = async (req, res) => {
  try {
    const site = await User.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ message: "Cannot find User" });
    } else {
      const site1 = await User.findByIdAndUpdate({ _id: site._id }, { $set: { status: req.body.status } }, { new: true });
      return res.json(site1);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};