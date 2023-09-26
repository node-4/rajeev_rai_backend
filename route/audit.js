const express = require("express");
const router = express.Router();
const auditController = require("../controllers/admin/audit");


router.get("/populateSiteId/:auditId", auditController.populateSiteId)
router.get("/admin/getAll/getAllAudits", auditController.getAllAudits);
router.get("/admin/get/getAuditById/:id", auditController.getAuditById);
router.post("/admin/create/createAudit", auditController.createAudit);
router.get("/admin/inspections/:id", auditController.inspections);
router.get("/audits", auditController.audits)
router.put("/updateStatus/:id", auditController.updateStatus)
router.put("/admin/update/updateAudit/:id", auditController.updateAudit);
router.delete("/admin/delete/deleteAudit/:id", auditController.deleteAudit);
router.get("/admin/getAuditStatus/:status", auditController.getAuditStatus);

module.exports = router;
