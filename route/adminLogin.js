const express = require("express");
const Router = express.Router();
const adminController = require("../controllers/admin/adminLogin");
const subAdminController = require("../controllers/admin/subAdmin");

// Router.route("/verifyOTP").post(authController.verifyOTP);
Router.route("/login").post(adminController.login);
Router.route("/signup").post(adminController.signup);
Router.route("/getAllAdmin").get(adminController.getAllAdmin)
Router.route("/getAllLogHistory").get(adminController.getAllLogHistory)
Router.route("/updateadmin/:id").put(adminController.updateadmin);
Router.route("/deleteadmin/:id").delete(adminController.deleteadmin)
// Router.route("/logout").post(authController.logout);
// Router.route("/forgetPassword").put(adminController.forgetPassword);
//=================
Router.post('/subAdmin', subAdminController.createSubAdmin);
Router.get('/subAdmin/:id', subAdminController.getSubAdminById);
Router.get('/subAdmin', subAdminController.getAllSubAdmin);
Router.put('/subAdmin/:id', subAdminController.updateSubAdminById);
Router.delete('/subAdmin/:id', subAdminController.deleteSubAdminById);
Router.route("/subAdmin/Login").post(subAdminController.subAdminLogin);

module.exports = Router;
