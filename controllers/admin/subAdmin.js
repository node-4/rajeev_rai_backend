const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/userCreate");
const jwt = require("jsonwebtoken")
module.exports.createSubAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Admin.findOne({ email, role: "subAdmin" });
    if (user) {
      return res.status(409).json({ status: 409, message: "Sub admin already Exit" });
    } else {
      const newAdmin = new Admin({ email, password: hashedPassword, role: "subAdmin" });
      await newAdmin.save();
      return res.status(200).json({ status: 200, message: "Sub admin Signup successfully.", data: newAdmin });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.subAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email, role: "subAdmin" });
    if (!user) {
      return res.status(401).json({ message: "Sub admin not found" });
    }
    console.log(user);
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15d", });
    return res.status(200).json({ message: "Sub admin logged in successfully", token, data: user, });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSubAdminById = async (req, res) => {
  try {
    const client = await Admin.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'subAdmin not found' });
    }
    res.status(200).json(client);
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error('Error getting subAdmin by ID:', err);
    return res.status(500).json({ error: 'Failed to get subAdmin' });
  }
};
exports.getAllSubAdmin = async (req, res) => {
  try {
    const audits = await Admin.find({ role: "subAdmin" });
    res.status(200).json({ success: true, data: audits });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports.updateSubAdminById = async (req, res) => {
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
module.exports.deleteSubAdminById = async (req, res) => {
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