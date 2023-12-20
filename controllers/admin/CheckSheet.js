const CheckSheet = require("../../model/CheckSheet");
const CheckSheetQuestion = require("../../model/CheckSheetQuestion");
const User = require("../../model/userCreate");
const Site = require("../../model/sites");
const XLSX = require("xlsx");
const ExcelJS = require("exceljs");
const fs = require("fs");
exports.createCheckSheet = async (req, res) => {
  try {
    const data = await Site.findById(req.body.siteId);
    if (!data) {
      return res.status(404).json({ status: 404, message: "Cannot find site" });
    }
    req.body.clientId = data.clientId;
    const checkSheet = await CheckSheet(req.body);
    await checkSheet.save();
    return res.status(200).json({ status: 200, message: "Checksheet create successfully", checkSheet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.getCheckSheetById = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.findById(req.params.id).populate("clientId siteId");
    if (!checkSheets) {
      return res.status(409).json({ status: 404, message: "checkSheets not found" });
    } else {
      return res.status(200).json({ status: 200, message: "checkSheets found", data: checkSheets });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updatedCheckSheet = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.findById(req.params.id);
    if (!checkSheets) {
      return res.status(409).json({ status: 404, message: "checkSheets not found" });
    } else {
      let siteId, clientId;
      if (req.body.siteId != (null || undefined)) {
        const data = await Site.findById(req.body.siteId);
        if (!data) {
          return res.status(404).json({ status: 404, message: "Cannot find site" });
        } else {
          siteId = data._id;
          clientId = data.clientId;
        }
      } else {
        siteId = checkSheets.siteId;
        clientId = checkSheets.clientId;
      }
      let obj = {
        nameOfCheckSheet: req.body.nameOfCheckSheet || checkSheets.nameOfCheckSheet,
        revisionNumber: req.body.revisionNumber || checkSheets.revisionNumber,
        id: req.body.id || checkSheets.id,
        siteId: siteId,
        clientId: clientId,
      }
      let update = await CheckSheet.findByIdAndUpdate({ _id: checkSheets._id }, { $set: obj }, { new: true });
      if (update) {
        return res.status(200).json({ status: 200, message: "checkSheets found", data: update });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteCheckSheet = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.findById(req.params.id);
    if (!checkSheets) {
      return res.status(409).json({ status: 404, message: "checkSheets not found" });
    }
    const checkSheet1 = await CheckSheet.findByIdAndDelete({ _id: checkSheets._id });
    if (checkSheet1) {
      return res.status(200).json({ status: 200, message: "checkSheets delete successfully." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllCheckSheets = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.find().populate("clientId siteId");
    if (checkSheets.length == 0) {
      return res.status(409).json({ status: 404, message: "checkSheets not found" });
    } else {
      return res.status(200).json({ status: 200, message: "checkSheets found", data: checkSheets });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.addQuestionInCheckSheetId = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.findById(req.body.checkSheetId);
    if (!checkSheets) {
      return res.status(404).json({ status: 404, message: "checkSheets not found" });
    } else {
      let findData = await CheckSheetQuestion.findOne({ checkSheetId: req.body.checkSheetId }).count();
      let obj = {
        checkSheetId: checkSheets._id,
        questionNo: findData + 1,
        question: req.body.question,
        type: req.body.type,
        answerDropdown: req.body.answerDropdown,
        photo: req.body.photo,
        remarks: req.body.remarks
      };
      const checkSheet1 = await CheckSheetQuestion(obj);
      await checkSheet1.save();
      let update = await CheckSheet.findByIdAndUpdate({ _id: checkSheets._id }, { $push: { CheckSheetQuestionId: checkSheet1._id } }, { new: true });
      return res.status(200).json({ status: 200, message: "CheckSheet Question create successfully", checkSheet1 });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getCheckSheetQuestionById = async (req, res) => {
  try {
    const checkSheets = await CheckSheetQuestion.findById(req.params.id).populate("checkSheetId");
    if (!checkSheets) {
      return res.status(409).json({ status: 404, message: "CheckSheetQuestion not found" });
    } else {
      return res.status(200).json({ status: 200, message: "CheckSheetQuestion found", data: checkSheets });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteCheckSheetQuestion = async (req, res) => {
  try {
    const checkSheets = await CheckSheetQuestion.findById(req.params.id);
    if (!checkSheets) {
      return res.status(409).json({ status: 404, message: "CheckSheetQuestion not found" });
    }
    const checkSheet1 = await CheckSheetQuestion.findByIdAndDelete({ _id: checkSheets._id });
    if (checkSheet1) {
      return res.status(200).json({ status: 200, message: "CheckSheetQuestion delete successfully." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllCheckSheetQuestion = async (req, res) => {
  try {
    const checkSheets = await CheckSheetQuestion.find({ checkSheetId: req.params.checkSheetId }).populate("checkSheetId");
    if (checkSheets.length == 0) {
      return res.status(409).json({ status: 404, message: "CheckSheetQuestion not found" });
    } else {
      return res.status(200).json({ status: 200, message: "CheckSheetQuestion  found", data: checkSheets });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.answerProvide = async (req, res) => {
  try {
    const { answer, isAnswer, remarks } = req.body;
    let findData = await CheckSheetQuestion.findOne({ _id: req.params.questionId });
    if (!findData) {
      return res.status(404).json({ status: 404, message: "CheckSheetQuestion not found" });
    } else {
      let photo;
      if (req.file) {
        photo = req.file.path;
      }
      let obj = { answer: answer, isAnswer: isAnswer, photo: photo, remarks: remarks };
      const checkSheet1 = await CheckSheetQuestion.findByIdAndUpdate({ _id: req.params.questionId }, { $set: obj }, { new: true });
      if (checkSheet1) {
        return res.status(200).json({ status: 200, message: "Answer provide successfully", checkSheet1 });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.updateCheckSheetSubmitted = async (req, res) => {
  try {
    const checkSheetId = req.params.id;
    const checkSheets = await CheckSheet.findById({ _id: checkSheetId });
    if (!checkSheets) {
      return res.status(404).json({ status: 404, message: "checkSheets not found" });
    } else {
      const updatedCheckSheet = await CheckSheet.findByIdAndUpdate({ _id: checkSheets._id }, { $set: { submitted: "true" } }, { new: true });
      return res.status(200).json({ status: 200, message: "Update checkSheet submitted successfully", updatedCheckSheet });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSubmittedCheckSheets = async (req, res) => {
  try {
    const submittedCheckSheets = await CheckSheet.find({ submitted: "true" });
    if (submittedCheckSheets.length == 0) {
      return res.status(409).json({ status: 404, message: "Submitted check sheets not found" });
    } else {
      return res.status(200).json({ status: 200, message: "Submitted check sheets found", data: submittedCheckSheets });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getCheckSheetBySiteId = async (req, res) => {
  try {
    const submittedCheckSheets = await CheckSheet.find({ siteId: req.params.id }).populate('CheckSheetQuestionId siteId clientId');
    if (submittedCheckSheets.length == 0) {
      return res.status(409).json({ status: 404, message: "Check sheet not found" });
    } else {
      return res.status(200).json({ status: 200, message: "Check sheet found", data: submittedCheckSheets });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.importCheckSheet = async (req, res) => {
  try {
    const file = req.file;
    const path = file.path;
    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const orders = XLSX.utils.sheet_to_json(sheet);
    orders.forEach(async (orderData) => {
      let clientId, siteId;
      const data = await Site.findById(orderData["siteId"]);
      if (data) {
        clientId = data.clientId;
        siteId = data._id;;
        const orderObj = {
          nameOfCheckSheet: orderData["nameOfCheckSheet"],
          revisionNumber: orderData["revisionNumber"],
          id: orderData["id"],
          siteId: siteId,
          clientId: clientId,
        };
        const order = await CheckSheet.create(orderObj);
      }
    });
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    });

    return res.status(200).json({ message: "Data uploaded successfully" });
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






///////////////////////////////////////////////////////////////////////////////////////////
// exports.createCheckSheet = async (req, res) => {
//   try {
//     const data = await Site.findById(req.body.siteId);
//     if (!data) {
//       return res.status(404).json({ message: "Cannot find site" });
//     }
//     let loca = data.location;
//     req.body.clientId = data.clientId;
//     req.body.circle = data.circle_state;
//     req.body.address = data.site_address;
//     const checkSheet = await CheckSheet(req.body);
//     checkSheet.location = loca;
//     await checkSheet.save();
//     console.log(checkSheet);
//     res.status(201).json(checkSheet);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error.message });
//   }
// };
// exports.getAllCheckSheets = async (req, res) => {
//   try {
//     const checkSheets = await CheckSheet.find().populate("inspectorid");
//     res.json({ msg: checkSheets });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// exports.getCheckSheetById = async (req, res) => {
//   try {
//     const checkSheet = await CheckSheet.findById(req.params.id).populate(
//       "inspectorid"
//     );
//     if (!checkSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }
//     res.json({ msg: checkSheet });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// exports.addQuestionInID = async (req, res) => {
//   try {
//     upload.single("file")(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ msg: err.message });
//       }

//       // Get the URL of the uploaded file
//       const fileUrl = req.file ? req.file.path : "";

//       const checkSheet = await CheckSheet.findByIdAndUpdate(
//         {
//           _id: req.params.id,
//         },
//         {
//           $push: {
//             addQuestionForInspect: {
//               question: req.body.question,
//               type: req.body.type,
//               answerDropdown: req.body.answerDropdown,
//               photo: fileUrl || req.body.photo,
//               remarks: req.body.remarks
//             },
//           },
//         },
//         { new: true }
//       )

//       if (!checkSheet) {
//         return res.status(404).json({ message: "Check sheet not found" });
//       }
//       res.json(checkSheet);
//     })
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// exports.updateCheckSheet = async (req, res) => {
//   try {
//     upload.single("file")(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ msg: err.message });
//       }

//       // Get the URL of the uploaded file
//       const fileUrl = req.file ? req.file.path : "";

//       const { checkSheetId, questionId } = req.params;
//       const { answer, isAnswer, photo, remarks } = req.body;

//       const updatedCheckSheet = await CheckSheet.updateOne(
//         {
//           _id: checkSheetId,
//           "addQuestionForInspect._id": questionId
//         },
//         {
//           $set: {
//             "addQuestionForInspect.$.answer": answer,
//             "addQuestionForInspect.$.isAnswer": isAnswer,
//             "addQuestionForInspect.$.photo": fileUrl || photo,
//             "addQuestionForInspect.$.remarks": remarks
//           }
//         }
//       );

//       if (updatedCheckSheet.nModified === 0) {
//         return res.status(404).json({ error: "Question or checkSheet not found" });
//       }

//       res.json({ message: "Answer updated successfully", updatedCheckSheet });
//     });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };
// exports.CheckAnswer = async (req, res) => {
//   try {
//     const checkSheet = await CheckSheet.findOne({ _id: req.params.id });

//     console.log(checkSheet);

//     if (!checkSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }

//     const questionsWithAnswer = checkSheet.addQuestionForInspect.filter(
//       (q) => q.answer !== "select" || q.isAnswer === true
//     );
//     const questionsWithoutAnswer = checkSheet.addQuestionForInspect.filter(
//       (q) => q.answer === "select" && q.isAnswer === false
//     );

//     // Shuffle the arrays
//     shuffleArray(questionsWithAnswer);
//     shuffleArray(questionsWithoutAnswer);

//     return res.status(200).json([questionsWithAnswer, questionsWithoutAnswer]);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }
// exports.deleteCheckSheet = async (req, res) => {
//   try {
//     const checkSheet = await CheckSheet.findByIdAndDelete(req.params.id);
//     if (!checkSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }
//     res.json({ message: "Check sheet deleted" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// exports.getCheckSheetBySiteId = async (req, res) => {
//   try {
//     const checkSheet = await CheckSheet.find({ siteId: req.params.id });
//     if (checkSheet.length == 0) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }
//     res.json({ msg: checkSheet });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// exports.getCheckSheetBySiteIdandchecksheetid = async (req, res) => {
//   try {
//     const checkSheet = await CheckSheet.find({
//       siteId: req.params.siteid,
//       _id: req.params.checsheet,
//     });
//     if (!checkSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }
//     res.json({ msg: checkSheet });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// // UPDATE a check sheet by ID
// exports.updatefields = async (req, res) => {
//   try {
//     const checkSheet = await CheckSheet.findByIdAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       {
//         $set: {
//           nameOfCheckSheet: req.body.nameOfCheckSheet,
//           revisionNumber: req.body.revisionNumber,
//           type: req.body.type,
//           uploadDocument: req.body.uploadDocument,
//           QA_CA_ID: req.body.QA_CA_ID,
//           client: req.body.client,
//           circle: req.body.circle,
//           auditDate: req.body.auditDate,
//           address: req.body.address,
//           location: req.body.location,
//           siteName: req.body.siteName,
//           siteId: req.body.siteId,
//           uploadDocument: req.body.uploadDocument,
//         },
//       },
//       { new: true }
//     );
//     if (!checkSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }
//     res.json(checkSheet);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// // UPDATE a check sheet by ID
// exports.populatesiteid = async (req, res) => {
//   try {
//     const checkSheets = await CheckSheet.find({
//       siteId: req.params.id,
//     }).populate("siteId"); // Populate the referenced siteId field

//     if (checkSheets.length === 0) {
//       return res.json([]);
//     }
//     return res.json({ msg: checkSheets });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// exports.updateCheckSheetSubmitted = async (req, res) => {
//   try {
//     const checkSheetId = req.params.id;

//     const updatedCheckSheet = await CheckSheet.findByIdAndUpdate(
//       checkSheetId,
//       { $set: { submitted: "true" } },
//       { new: true }
//     );

//     if (!updatedCheckSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }

//     res.status(200).json({ updatedCheckSheet });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
// exports.getSubmittedCheckSheets = async (req, res) => {
//   try {
//     const submittedCheckSheets = await CheckSheet.find({ submitted: "true" });

//     res.status(200).json({ submittedCheckSheets });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };