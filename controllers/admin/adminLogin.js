const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/userCreate");
const logHistory = require("../../model/logHistory");
const jwt = require("jsonwebtoken")
module.exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Admin.findOne({ email, role: "admin" });
    if (user) {
      return res.status(409).json({ status: 409, message: "admin already Exit" });
    } else {
      const newAdmin = new Admin({ email, password: hashedPassword, role: "admin" });
      await newAdmin.save();
      return res.status(200).json({ status: 200, message: "Admin Signup successfully.", data: newAdmin });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(401).json({ message: "admin not found" });
    }
    console.log(user);
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15d", });
    return res.status(200).json({ message: "Admin logged in successfully", token, data: user, });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllAdmin = async (req, res) => {
  try {
    const audits = await Admin.find({ role: "admin" });
    res.status(200).json({ success: true, data: audits });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports.updateadmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!admin) {
      return res.status(404).send();
    }
    return res.send(admin);
  } catch (err) {
    res.status(400).send(err);
  }
}
module.exports.deleteadmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).send();
    }
    return res.send(admin);
  } catch (err) {
    return res.status(500).send(err);
  }
}
exports.getAllLogHistory = async (req, res) => {
  try {
    const audits = await logHistory.find({});
    if (audits.length == 0) {
      return res.status(404).json({ success: false, message: "No log history found" });
    } else {
      return res.status(200).json({ success: true, data: audits });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};