const express = require("express");
const Router = express.Router();
const userController = require("../controllers/user/userCreate");
const { verifyToken } = require("../middleware/middleware")

Router.route("/login").post(userController.login);
Router.route("/loginWithPhone").post(userController.loginWithPhone);
Router.route("/verifyotp").post(userController.verifyotp);
Router.route("/signup").post(userController.signup);
Router.route("/getall").get(userController.getAll);
Router.route("/getByUserId/:id").get(/*verifyToken,*/userController.getUserById)
Router.route("/update/:id").put(/*verifyToken,*/userController.updateUser)
Router.route("/updateLocationofUser/:id").put(/*verifyToken,*/userController.updateLocationofUser)
Router.route("/forgetPassword").post(userController.forgetPassword);
module.exports = Router;
