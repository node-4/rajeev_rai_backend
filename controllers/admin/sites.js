const Site = require("../../model/sites");
const clientModel = require("../../model/client");
const CheckSheet = require("../../model/CheckSheet");

// Controller function to create a site
exports.createSite = async (req, res) => {
  try {
    const {
      QA_CA_ID,
      Client_email,
      siteId,
      siteName,
      circle_state,
      location,
      site_address,
      dueDate,
      dateAuditScheduled,
      dateAllocated,
      InspectorName,
      dateActualAudit,
      reviewerName,
      dateReviewed,
      clientRepName,
      DateClient,
      uploadFileFromDevice,

    } = req.body; // Destructure request body


    const newSite = new Site({
      QA_CA_ID,
      Client_email,
      siteId,
      siteName,
      circle_state,
      location,
      site_address,
      dueDate,
      dateAuditScheduled,
      dateAllocated,
      InspectorName,
      dateActualAudit,
      reviewerName,
      dateReviewed,
      clientRepName,
      DateClient,
      uploadFileFromDevice,
    });

    const savedSite = await newSite.save(); // Save the new site to siteModel
    // console.log(savedSite. _id)
    // const checkSheet = await CheckSheet.create({siteId:savedSite. _id, siteName:savedSite.siteName})

    res.status(201).json({ site: savedSite }); // Send the saved site as JSON response with 201 status code
  } catch (err) {
    return res.status(500).json({ error: "Failed to create site" }); // Handle any error that occurs
  }
};



// READ ALL
module.exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json({ msg: sites });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// READ ONE
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
    res.status(400).json({ message: err.message });
  }
};





// DELETE
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
    res.status(200).json({ msg: site });
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error("Error getting client names:", err);
    return res.status(500).json({ error: "Failed to get client names" });
  }
};

