const Inspector = require("../../model/inspector");
const Admin = require("../../model/adminLogin");
const jwt = require("jsonwebtoken")
const clientModel = require('../../model/client');
const reviewerModel = require('../../model/reviewer');

exports.total = async (req, res) => {
    try {
      const inspectors = await Inspector.find();
      if (!inspectors ||inspectors == null) {
        return res.status(404).json({ message: "Cannot find inspectors" });
      }
      const audits = await Admin.find();
      if (!audits ||audits == null) {
        return res.status(404).json({ message: "Cannot find audits" });
      }
      const client = await clientModel.find();
      if (!client ||client == null) {
        return res.status(404).json({ message: "Cannot find client" });
      }
       const reviewers = await reviewerModel.find()
       if (!reviewers ||reviewers == null) {
        return res.status(404).json({ message: "Cannot find reviewers" });
      }
      res.status(200).json({ success: true, data:{inspectors:inspectors,audits:audits,client:client,reviewers:reviewers} })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  
  

