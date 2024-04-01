const Site = require("../../model/sites");
const CheckSheet = require("../../model/CheckSheet");
const reportSites = require("../../model/reportSites");
const reportCheckSheetQuestion = require("../../model/reportCheckSheetQuestion");
const clientModel = require('../../model/userCreate');
const XLSX = require("xlsx");
const ExcelJS = require("exceljs");
const mongoose = require("mongoose");
const fs = require("fs");
exports.createSite = async (req, res) => {
  try {
    const { QA_CA_ID, QACA_Activity_Type, QACA_Activity_TypeOther, clientId, siteId, siteName, circle_state, location, site_address, dueDate, dateAllocated } = req.body;
    const client = await clientModel.findOne({ _id: clientId, role: "client" });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    let clientRepName = client.representativeName;
    let Client_email = client.email;
    let uploadFileFromDevice;
    if (req.file) {
      uploadFileFromDevice = req.file ? req.file.path : "";
    }
    const newSite = new Site({ QA_CA_ID, QACA_Activity_Type, QACA_Activity_TypeOther, uploadFileFromDevice, Client_email, clientRepName, clientId, siteId, siteName, circle_state, location, site_address, dueDate, dateAllocated, uploadFileFromDevice, });
    const savedSite = await newSite.save();
    return res.status(201).json({ site: savedSite });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create site" }); // Handle any error that occurs
  }
};
exports.getSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id).populate("clientId reportSites");
    if (site == null) {
      return res.status(404).json({ message: "Cannot find site" });
    }
    res.json({ msg: site });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateSite = async (req, res) => {
  try {
    if (req.file) {
      req.body.uploadFileFromDevice = req.file ? req.file.path : "";
    }
    const site = await Site.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }
    res.json(site);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.deleteSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (site == null) {
      return res.status(404).json({ message: "Cannot find site" });
    }
    const deletedNotification = await Site.findByIdAndDelete(site._id);
    res.json({ message: "Site deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.getAllSites = async (req, res) => {
  try {
    let query1 = {};
    if (req.query.clientId) {
      query1 = { clientId: req.query.clientId };
    }
    if (req.query.auditorId) {
      query1 = { auditorId: req.query.auditorId };
    }
    if (req.query.reviewerId) {
      query1 = { reviewerId: req.query.reviewerId };
    }
    const sites = await Site.find(query1).populate("clientId");
    if (sites.length == 0) {
      return res.status(404).json({ status: 404, message: "No data found" });
    }
    return res.json({ status: 200, message: "Data found successfully.", msg: sites });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.importSite = async (req, res) => {
  try {
    console.log(req.file);
    const file = req.file;
    const path = file.path;
    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const orders = XLSX.utils.sheet_to_json(sheet);
    orders.forEach(async (orderData) => {
      const orderObj = {
        QA_CA_ID: orderData["QA_CA_ID"],
        QACA_Activity_Type: orderData["QACA_Activity_Type"],
        QACA_Activity_TypeOther: orderData["QACA_Activity_TypeOther"],
        siteId: orderData["siteId"],
        siteName: orderData["siteName"],
        circle_state: orderData["circle_state"],
        location: orderData["location"],
        site_address: orderData["site_address"],
        clientRepName: orderData["clientRepName"],
        dueDate: orderData["dueDate"],
        InspectorName: orderData["InspectorName"],
        dateAllocated: orderData["dateAllocated"],
        uploadFileFromDevice: orderData["uploadFileFromDevice"],
      };
      const order = await Site.create(orderObj);
      console.log(order);
    });
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    });

    res.status(200).json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: error.message });
  }
};
exports.downloadSite = async (req, res) => {
  try {
    let query = { ...req.query };
    const orders = await Site.find(query)
    const data = orders.map((order, index) => [
      index + 1,
      order.QA_CA_ID,
      order.siteId,
      order.circle_state,
      order.location,
      order.site_address,
      order.clientRepName,
      order.DateClient,
      order.InspectorName,
      order.uploadFileFromDevice,
    ]);
    data.unshift([
      "sr No",
      "QA_CA_ID",
      "siteId",
      "circle_state",
      "location",
      "site_address",
      "clientRepName",
      "DateClient",
      "uploadFileFromDevice",
    ]);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");
    worksheet.columns = [
      { header: "sr No", key: "srNo" },
      { header: "QA_CA_ID", key: "QA_CA_ID" },
      { header: "siteId", key: "siteId" },
      { header: "circle_state", key: "circle_state" },
      { header: "location", key: "location" },
      { header: "site_address", key: "site_address" },
      { header: "clientRepName", key: "clientRepName" },
      { header: "DateClient", key: "DateClient" },
      { header: "uploadFileFromDevice", key: "uploadFileFromDevice" },
    ];
    worksheet.addRows(data);
    const filePath = "./sites.xlsx";
    await workbook.xlsx.writeFile(filePath);
    return res.status(200).send({ message: "Data found", data: filePath });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
exports.assignSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ message: "Cannot find site" });
    } else {
      let reportSite = [];
      for (let i = 0; i < req.body.checkSheetId.length; i++) {
        let checkSheet1 = await CheckSheet.findById(req.body.checkSheetId[i]);
        if (checkSheet1) {
          let checkSheetQuestion = [];
          for (let j = 0; j < checkSheet1.CheckSheetQuestionId.length; j++) {
            let obj1 = {
              siteId: site._id,
              checkSheetId: checkSheet1._id,
              checkSheetQuestionId: checkSheet1.CheckSheetQuestionId[i],
            }
            const landData1 = await reportCheckSheetQuestion.create(obj1);
            let obj = {
              reportCheckSheetQuestionId: landData1._id,
            }
            checkSheetQuestion.push(obj);
          }
          let reportSitesObj = {
            clientId: site.clientId,
            auditorId: req.body.auditorId,
            reviewerId: req.body.reviewerId,
            siteId: site._id,
            dateAllocated: req.body.dateAllocated,
            dateAuditScheduled: req.body.dateAuditScheduled,
            dateActualAudit: req.body.dateActualAudit,
            contractorTSPName: req.body.contractorTSPName,
            contractorTSPMobileNo: req.body.contractorTSPMobileNo,
            checksheet: req.body.checkSheetId[i],
            checkSheetQuestion: checkSheetQuestion,
          }
          const landData = await reportSites.create(reportSitesObj);
          if (landData) {
            reportSite.push(landData._id)
            for (let k = 0; k < landData.checkSheetQuestion.length; k++) {
              const landData1 = await reportCheckSheetQuestion.findById({ _id: landData.checkSheetQuestion[k].reportCheckSheetQuestionId });
              await reportCheckSheetQuestion.findByIdAndUpdate({ _id: landData1._id }, { $set: { reportSitesId: landData._id } }, { new: true });
            }
          }
        }
      }
      const site1 = await Site.findByIdAndUpdate({ _id: site._id }, { $set: { reportSites: reportSite } }, { new: true });
      return res.json({ status: 200, message: "Check sheet assigned successfully.", site1 });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.getAllSitesForAuditorOrReviewer = async (req, res) => {
  try {
    let query1 = {};
    if (req.query.clientId) {
      query1 = { clientId: req.query.clientId };
    }
    if (req.query.auditorId) {
      query1 = { auditorId: req.query.auditorId };
    }
    if (req.query.reviewerId) {
      query1 = { reviewerId: req.query.reviewerId };
    }
    const sites = await reportSites.find(query1).populate([{ path: "clientId" }, { path: "auditorId" }, { path: "siteId" }, { path: "reviewerId" }, { path: "checksheet" }, { path: "checkSheetQuestion", populate: { path: "reportCheckSheetQuestionId", populate: { path: "checkSheetQuestionId", } } }]);
    if (sites.length == 0) {
      return res.status(404).json({ status: 404, message: "No data found" });
    }
    return res.json({ status: 200, message: "Data found successfully.", msg: sites });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getAllClientNames = async (req, res) => {
  try {
    const CheckSheet1 = await CheckSheet.find({ siteId: req.params.id });
    if (CheckSheet1 == null) {
      return res.status(404).json({ message: "Cannot find CheckSheet" });
    }
    const clientNames = CheckSheet1.map(ch => ({ _id: ch._id, nameOfCheckSheet: ch.nameOfCheckSheet }));
    const site = await Site.findById(req.params.id);
    site.checksheet = clientNames
    await site.save()
    return res.status(200).json({ msg: site });
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error("Error getting client names:", err);
    return res.status(500).json({ error: "Failed to get client names" });
  }
};
exports.updateScheduleSite = async (req, res) => {
  try {
    const findsReportSite = await reportSites.findById(req.params.id);
    if (!findsReportSite) {
      return res.status(404).json({ message: "Cannot find site" });
    } else {
      const site = await Site.findById({ _id: findsReportSite.siteId });
      if (!site) {
        return res.status(404).json({ message: "Cannot find site" });
      } else {
        let reportSite = [];
        for (let i = 0; i < req.body.checkSheetId.length; i++) {
          let checkSheet1 = await CheckSheet.findById(req.body.checkSheetId[i]);
          if (checkSheet1) {
            let checkSheetQuestion = [];
            for (let j = 0; j < checkSheet1.CheckSheetQuestionId.length; j++) {
              let obj1 = {
                siteId: findsReportSite.siteId,
                checkSheetId: checkSheet1._id,
                checkSheetQuestionId: checkSheet1.CheckSheetQuestionId[i],
              }
              const landData1 = await reportCheckSheetQuestion.create(obj1);
              let obj = {
                reportCheckSheetQuestionId: landData1._id,
              }
              checkSheetQuestion.push(obj);
            }
            let reportSitesObj = {
              clientId: site.clientId,
              auditorId: req.body.auditorId,
              reviewerId: req.body.reviewerId,
              siteId: site._id,
              dateAllocated: req.body.dateAllocated,
              dateActualAudit: req.body.dateActualAudit,
              dateAuditScheduled: req.body.dateAuditScheduled,
              contractorTSPName: req.body.contractorTSPName,
              contractorTSPMobileNo: req.body.contractorTSPMobileNo,
              checksheet: req.body.checkSheetId[i],
              checkSheetQuestion: checkSheetQuestion,
            }
            const landData = await reportSites.findByIdAndUpdate({ _id: findsReportSite._id }, { $set: reportSitesObj }, { new: true });
            if (landData) {
              reportSite.push(landData._id)
              for (let k = 0; k < landData.checkSheetQuestion.length; k++) {
                const landData1 = await reportCheckSheetQuestion.findById({ _id: landData.checkSheetQuestion[k].reportCheckSheetQuestionId });
                await reportCheckSheetQuestion.findByIdAndUpdate({ _id: landData1._id }, { $set: { reportSitesId: landData._id } }, { new: true });
              }
            }
          }
        }
        const site1 = await Site.findByIdAndUpdate({ _id: site._id }, { $set: { reportSites: reportSite } }, { new: true });
        return res.json({ status: 200, message: "Check sheet assigned successfully.", site1 });
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.getScheduleSiteById = async (req, res) => {
  try {
    const findsReportSite = await reportSites.findById(req.params.id);
    if (!findsReportSite) {
      return res.status(404).json({ message: "Cannot find ScheduleSite" });
    } else {
      return res.json({ status: 200, message: "ScheduleSite found successfully.", site1 });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.deleteScheduleSite = async (req, res) => {
  try {
    const findsReportSite = await reportSites.findById(req.params.id);
    if (!findsReportSite) {
      return res.status(404).json({ message: "Cannot find ScheduleSite" });
    } else {
      const landData = await reportSites.findByIdAndDelete({ _id: findsReportSite._id });
      if (landData) {
        const landData1 = await reportCheckSheetQuestion.find({ reportSitesId: req.params.id });
        if (landData1.length > 0) {
          for (let i = 0; i < landData1.length; i++) {
            await reportCheckSheetQuestion.findByIdAndDelete({ _id: landData1[i]._id });
          }
        }
      }
      return res.json({ status: 200, message: "ScheduleSite delete successfully.", landData });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};