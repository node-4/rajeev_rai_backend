const express = require("express");
const notificationRouter = express.Router();
const {sendNotifications , getallnotification , getNotification , updateNotification , deleteNotification} = require("../controllers/admin/notification");



notificationRouter.post("/admin/sendNotifications", sendNotifications);
notificationRouter.get("/admin/getallnotification", getallnotification);
notificationRouter.get("/admin/getNotification/:id", getNotification);
notificationRouter.put("/admin/updateNotification/:id", updateNotification);
notificationRouter.delete("/admin/deleteNotification/:id", deleteNotification);

module.exports = notificationRouter;
