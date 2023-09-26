const express = require("express");
const router = express.Router();
const siteController = require("../controllers/admin/sites");

//ADMIN
router.post("/admin/create/createSite", siteController.createSite);
router.get("/admin/getAll/getAllSites", siteController.getAllSites);
router.get("/admin/get/getSite/:id", siteController.getSite);
router.get("/admin/getAllClientNames/:id", siteController.getAllClientNames)
router.patch("/admin/update/updateSite/:id", siteController.updateSite);
router.delete("/admin/delete/deleteSite/:id", siteController.deleteSite);

module.exports = router;
