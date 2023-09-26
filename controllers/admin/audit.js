const Audit = require("../../model/audit");

const moment = require("moment");

const siteModel = require("../../model/sites"); // Import the siteModel

// Controller function to populate siteId in audit collection
// exports.populateSiteId = async (req, res) => {
//   try {
//     // Fetch audit document by auditId from request params
//     const siteId = req.params.siteId;
//     const site = await siteModel.findById(siteId);
//     console.log(site);

//     if (!site) {
//       return res.status(404).json({ message: "site not found" });
//     }

//     // Populate siteId field from site collection
//     const audit = await Audit.find({siteId:site._id});
//     if (!audit) {
//       return res.status(404).json({ message: "audit not found" });
//     }

//     // Update audit document with siteId and save
//     // audit.siteId = site._id;
//     // await audit.save();

//     return res
//       .status(200)
//       .json({ message: "SiteId populated successfully", audit });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


exports.populateSiteId = async (req, res) => {
  try {
    // Fetch audit document by auditId
    const auditId = req.params.auditId
    const audit = await Audit.findById(auditId);

    if (!audit) {
      throw new Error('Audit not found');
    }

    // Populate siteId field from site collection
    await audit.populate('siteId').execPopulate();

    return { success: true, message: 'SiteId populated successfully', audit };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Failed to populate SiteId in Audit', error: err.message };
  }
};




exports.getAllAudits = async (req, res) => {
  try {
    const audits = await Audit.find().populate("siteId checksheetid")
    res.status(200).json({ success: true, data: audits });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAuditById = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id).populate("siteId checksheetid")
    res.status(200).json({ success: true, data: audit });
  } catch (error) {
    res.status(404).json({ success: false, error: "Audit not found" });
  }
};

exports.createAudit = async (req, res) => {
  try {
    const parsedDate = moment(req.body.date, "YYYY-MM-DD").format();
    //const parsedDate =  new Date(req.body.date, "YYYY-MM-DD").format() + 1
    const data = {
      siteId: req.body.siteId,
      siteName: req.body.siteName,
      Status: req.body.Status,
      inspectorName: req.body.inspectorName,
      clientName: req.body.clientName,
      location: req.body.location,
      date: parsedDate,
      address: req.body.address,
      // auditRequirements: req.body.auditRequirements,
      // uploadFileFromYourDevice: req.body.uploadFileFromYourDevice,
      checksheetid: req.body.checksheetid,
    };

    const audit = await Audit.create(data);
    res.status(201).json({ success: true, data: audit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: audit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: audit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get the number of days left until an inspection starts
exports.inspections = async (req, res) => {
  // router.get('/inspections/:id/days-left', async (req, res) => {
  try {
    const auditId = req.params.id;
    const audit = await Audit.findById(auditId);

    if (!audit) {
      return res.status(404).json({ message: "Inspection not found" });
    }

    const inspectionStartDate = moment(audit.date);
    const today = moment();
    const daysLeft = inspectionStartDate.diff(today, "days");

    res.json({ daysLeft });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.audits = async (req, res) => {
  try {
    // const audits = await Audit.find();

    // const filteredAudits = audits.filter((audit) => {
    //   const auditDate = new Date(audit.date);

    //   const timeIndex = audit.date.indexOf("T");

    //   const dateOnly = audit.date.substring(0, timeIndex);
    //   console.log(dateOnly)
    //   const date = new Date(dateOnly);
    //   return auditDate < date;
    // });
    // res.json(filteredAudits);

    const today = new Date(); // get today's date
    // const today = Date.now()
    console.log(today);
    const audits = await Audit.find().populate("siteId checksheetid")
    const filteredAudits = audits.filter((audit) => {
      const auditDate = new Date(audit.date);
      console.log(auditDate);
      return auditDate >= today; // return only audits aligned from today's date
    });
    res.json({ msg: filteredAudits })
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: audit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.getAuditStatus = async (req, res) => {
  try {
    const audit = await Audit.find({ Status: req.params.status }).populate("siteId checksheetid")
    if (!audit) {
      return res.status(404).json({ message: "audit not found" });
    }
    res.status(200).json({ success: true, data: audit });
  } catch (error) {
    res.status(404).json({ success: false, error: "Audit not found" });
  }
};