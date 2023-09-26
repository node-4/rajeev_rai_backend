const express = require("express");
const Router = express.Router();
const adminController = require("../controllers/admin/adminLogin");

// Router.route("/verifyOTP").post(authController.verifyOTP);
Router.route("/login").post(adminController.login);
Router.route("/signup").post(adminController.signup);
Router.route("/getAllAdmin").get(adminController.getAllAdmin)
Router.route("/updateadmin/:id").put(adminController.updateadmin);
Router.route("/deleteadmin/:id").delete(adminController.deleteadmin)
// Router.route("/logout").post(authController.logout);
// Router.route("/forgetPassword").put(adminController.forgetPassword);

//=================

module.exports = Router;
