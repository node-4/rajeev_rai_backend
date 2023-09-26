const express = require("express");
const router = express.Router();
const checkSheetController = require("../controllers/admin/CheckSheet");
const { verifyToken } = require("../middleware/middleware")


//ADMIN
router.post("/admin/create/CheckSheet", checkSheetController.createCheckSheet);
router.get("/admin/getAll/checkSheet", checkSheetController.getAllCheckSheets);
router.get("/admin/getById/checkSheet/:id", checkSheetController.getCheckSheetById);
router.get("/admin/getById/checkSheet/:siteid/:checsheet", checkSheetController.getCheckSheetBySiteIdandchecksheetid);

router.patch("/admin/update/checkSheet/:checkSheetId/:questionId", verifyToken, checkSheetController.updateCheckSheet);/*addQuestionInID*/
router.patch("/admin/addQuestionInID/:id", checkSheetController.addQuestionInID)
router.get("/admin/CheckAnswer/:id", checkSheetController.CheckAnswer);

router.delete("/admin/delete/checkSheet/:id", checkSheetController.deleteCheckSheet)
router.get("/getCheckSheetBySiteId/:id", checkSheetController.getCheckSheetBySiteId)
router.put("/updatefields/:id", checkSheetController.updatefields)
router.get("/populatesiteid/:id", checkSheetController.populatesiteid)
router.put("/updateCheckSheetSubmitted/:id", checkSheetController.updateCheckSheetSubmitted)
router.get("/check/getSubmittedCheckSheets", checkSheetController.getSubmittedCheckSheets)


module.exports = router; 