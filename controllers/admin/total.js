const Admin = require("../../model/userCreate");
const jwt = require("jsonwebtoken")

exports.total = async (req, res) => {
  try {
    const inspectors = await Admin.find({ role: "admin" });
    if (!inspectors || inspectors == null) {
      return res.status(404).json({ message: "Cannot find inspectors" });
    }
    const audits = await Admin.find({ role: "auditor" });
    if (!audits || audits == null) {
      return res.status(404).json({ message: "Cannot find audits" });
    }
    const client = await Admin.find({ role: "client" });
    if (!client || client == null) {
      return res.status(404).json({ message: "Cannot find client" });
    }
    const reviewers = await Admin.find({ role: "reviewer" })
    if (!reviewers || reviewers == null) {
      return res.status(404).json({ message: "Cannot find reviewers" });
    }
    res.status(200).json({ success: true, data: { inspectors: inspectors, audits: audits, client: client, reviewers: reviewers } })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





