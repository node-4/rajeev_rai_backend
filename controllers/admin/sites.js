const Site = require("../../model/sites");
const clientModel = require("../../model/client");
const CheckSheet = require("../../model/CheckSheet");
const XLSX = require("xlsx");
const ExcelJS = require("exceljs");
const fs = require("fs");
exports.createSite = async (req, res) => {
  try {
    const { QA_CA_ID, Client_email, siteId, siteName, circle_state, location, site_address, dueDate, dateAuditScheduled, dateAllocated, InspectorName, dateActualAudit, reviewerName, dateReviewed, clientRepName, DateClient, uploadFileFromDevice, } = req.body; // Destructure request body
    const newSite = new Site({ QA_CA_ID, Client_email, siteId, siteName, circle_state, location, site_address, dueDate, dateAuditScheduled, dateAllocated, InspectorName, dateActualAudit, reviewerName, dateReviewed, clientRepName, DateClient, uploadFileFromDevice, });
    const savedSite = await newSite.save(); // Save the new site to siteModel
    // console.log(savedSite. _id)
    // const checkSheet = await CheckSheet.create({siteId:savedSite. _id, siteName:savedSite.siteName})
    return res.status(201).json({ site: savedSite }); // Send the saved site as JSON response with 201 status code
  } catch (err) {
    return res.status(500).json({ error: "Failed to create site" }); // Handle any error that occurs
  }
};
module.exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json({ msg: sites });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
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
    const site = await Site.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }
    res.json(site);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
module.exports.deleteSite = async (req, res) => {
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
exports.getAllClientNames = async (req, res) => {
  try {
    // Fetch all documents from the site collection in the database
    const CheckSheet1 = await CheckSheet.find({ siteId: req.params.id });
    if (CheckSheet1 == null) {
      return res.status(404).json({ message: "Cannot find CheckSheet" });
    }
    // Extract client names from the fetched documents
    // const clientNames = CheckSheet1.map((ch) => ch._id , ch.nameOfCheckSheet);
    const clientNames = CheckSheet1.map(ch => ({ _id: ch._id, nameOfCheckSheet: ch.nameOfCheckSheet }));

    const site = await Site.findById(req.params.id);
    site.checksheet = clientNames
    await site.save()
    // Send the client names as the response
    return res.status(200).json({ msg: site });
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error("Error getting client names:", err);
    return res.status(500).json({ error: "Failed to get client names" });
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
        siteId: orderData["siteId"],
        circle_state: orderData["circle_state"],
        location: orderData["location"],
        site_address: orderData["site_address"],
        clientRepName: orderData["clientRepName"],
        DateClient: orderData["DateClient"],
        InspectorName: orderData["InspectorName"],
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