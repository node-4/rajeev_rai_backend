const express = require("express");
const Router = express.Router();
const admin = require("../controllers/admin/allotedSites");

Router.route("/createAllotedSites").post(admin.createAllotedSites);

// //=================


module.exports = Router;
