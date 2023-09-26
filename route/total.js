const express = require("express");
const router = express.Router();
const siteController = require("../controllers/admin/total");

//ADMIN
router.get("/getalltotal", siteController.total);


module.exports = router;
