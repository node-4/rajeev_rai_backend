const express = require("express");
const router = express.Router();
const siteController = require("../controllers/admin/sites");
const multer = require("multer");
const storage1 = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, "/");
        },
        filename: function (req, file, cb) {
                cb(null, file.originalname);
        },
});
const upload1 = multer({ storage: storage1 });
const { upload, } = require('../middleware/imageUpload')

router.post("/admin/create/createSite", upload.single('uploadFileFromDevice'), siteController.createSite);
router.put("/admin/assignSite/:id", siteController.assignSite);
router.get("/admin/getAll/getAllSites", siteController.getAllSites);
router.get("/admin/get/getSite/:id", siteController.getSite);
router.get("/admin/getAllClientNames/:id", siteController.getAllClientNames)
router.patch("/admin/update/updateSite/:id", upload.single('uploadFileFromDevice'), siteController.updateSite);
router.delete("/admin/delete/deleteSite/:id", siteController.deleteSite);
router.post("/admin/uploadSite", upload1.single("file"), siteController.importSite);
router.get("/admin/downloadSite", siteController.downloadSite);
router.get("/admin/getAll/getAllSitesForAuditorOrReviewer", siteController.getAllSitesForAuditorOrReviewer);

module.exports = router;
