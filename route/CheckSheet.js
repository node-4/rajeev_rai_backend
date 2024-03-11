const express = require("express");
const router = express.Router();
const checkSheetController = require("../controllers/admin/CheckSheet");
const { verifyToken } = require("../middleware/middleware")
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls"], }, });
const upload = multer({ storage: storage });

router.post("/admin/create/CheckSheet", checkSheetController.createCheckSheet);
router.get("/admin/getById/checkSheet/:id", checkSheetController.getCheckSheetById);
router.put("/admin/update/checkSheet/:id", checkSheetController.updatedCheckSheet)
router.delete("/admin/delete/checkSheet/:id", checkSheetController.deleteCheckSheet)
router.get("/admin/getAll/checkSheet", checkSheetController.getAllCheckSheets);
router.get("/check/getSubmittedCheckSheets", checkSheetController.getSubmittedCheckSheets)
router.get("/getCheckSheetBySiteId/:id", checkSheetController.getCheckSheetBySiteId)
router.get("/getReportSitesById/:id", checkSheetController.getReportSitesById)

router.post("/admin/addQuestionInChecklist", checkSheetController.addQuestionInCheckSheetId)
router.get("/admin/getById/Question/:id", checkSheetController.getCheckSheetQuestionById);
router.put("/admin/update/Question/:id", checkSheetController.updateQuestionInCheckSheetId);
router.delete("/admin/delete/CheckSheetQuestion/:id", checkSheetController.deleteCheckSheetQuestion)
router.get("/admin/getCheckSheetQuestionBycheckSheetId/:checkSheetId", checkSheetController.getAllCheckSheetQuestion);

router.put("/admin/answerProvide/:questionId", upload.single('file'), checkSheetController.answerProvide);
router.put("/updateCheckSheetSubmitted/:id", checkSheetController.updateCheckSheetSubmitted)
router.delete("/admin/delete/ReportSites/:id", checkSheetController.deleteReportSites)
router.get("/admin/getAllReportSites", checkSheetController.getAllReportSites);
router.put("/admin/updateReportSites/:id", checkSheetController.updateReportSites)


//ADMIN
// router.post("/admin/create/CheckSheet", checkSheetController.createCheckSheet);/////////
// router.get("/admin/getAll/checkSheet", checkSheetController.getAllCheckSheets);//////////
// router.get("/admin/getById/checkSheet/:id", checkSheetController.getCheckSheetById);////////
// router.get("/admin/getById/checkSheet/:siteid/:checsheet", checkSheetController.getCheckSheetBySiteIdandchecksheetid);

// router.patch("/admin/update/checkSheet/:checkSheetId/:questionId", verifyToken, checkSheetController.updateCheckSheet)////////////////
// router.patch("/admin/addQuestionInID/:id", checkSheetController.addQuestionInID) ///////////////////
// router.get("/admin/CheckAnswer/:id", checkSheetController.CheckAnswer);

// router.delete("/admin/delete/checkSheet/:id", checkSheetController.deleteCheckSheet)
// router.get("/getCheckSheetBySiteId/:id", checkSheetController.getCheckSheetBySiteId)
// router.put("/updatefields/:id", checkSheetController.updatefields)
// router.get("/populatesiteid/:id", checkSheetController.populatesiteid)
// router.put("/updateCheckSheetSubmitted/:id", checkSheetController.updateCheckSheetSubmitted)
// router.get("/check/getSubmittedCheckSheets", checkSheetController.getSubmittedCheckSheets)


module.exports = router; 