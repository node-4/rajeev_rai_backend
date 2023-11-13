const CheckSheet = require("../../model/CheckSheet");
const Inspector = require("../../model/inspector");
const User = require("../../model/userCreate");


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image", // optional folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls"], // allowed file formats
  },
});
const upload = multer({ storage: storage });
exports.createCheckSheet = async (req, res) => {
  try {

    const data = await User.findById({ _id: req.body.inspectorid });
    if (!data) {
      return res.status(404).json({ message: "Inspector not found" });
    }

    let loca = data.location;
    const checkSheet = await CheckSheet(req.body);
    checkSheet.location = loca;
    await checkSheet.save();
    console.log(checkSheet);
    res.status(201).json(checkSheet);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
// READ all check sheets
exports.getAllCheckSheets = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.find().populate("inspectorid");
    res.json({ msg: checkSheets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// READ a single check sheet by ID
exports.getCheckSheetById = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findById(req.params.id).populate(
      "inspectorid"
    );
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json({ msg: checkSheet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.addQuestionInID = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }

      // Get the URL of the uploaded file
      const fileUrl = req.file ? req.file.path : "";

      const checkSheet = await CheckSheet.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            addQuestionForInspect: {
              question: req.body.question,
              type: req.body.type,
              answerDropdown: req.body.answerDropdown,
              photo: fileUrl || req.body.photo,
              remarks: req.body.remarks
            },
          },
        },
        { new: true }
      )

      if (!checkSheet) {
        return res.status(404).json({ message: "Check sheet not found" });
      }
      res.json(checkSheet);
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateCheckSheet = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }

      // Get the URL of the uploaded file
      const fileUrl = req.file ? req.file.path : "";

      const { checkSheetId, questionId } = req.params;
      const { answer, isAnswer, photo, remarks } = req.body;

      const updatedCheckSheet = await CheckSheet.updateOne(
        {
          _id: checkSheetId,
          "addQuestionForInspect._id": questionId
        },
        {
          $set: {
            "addQuestionForInspect.$.answer": answer,
            "addQuestionForInspect.$.isAnswer": isAnswer,
            "addQuestionForInspect.$.photo": fileUrl || photo,
            "addQuestionForInspect.$.remarks": remarks
          }
        }
      );

      if (updatedCheckSheet.nModified === 0) {
        return res.status(404).json({ error: "Question or checkSheet not found" });
      }

      res.json({ message: "Answer updated successfully", updatedCheckSheet });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// Update the addQuestionForInspect array with answerDropdown data
// router.put("/questions/:questionId", async (req, res) => {
//   try {
//     const { questionId } = req.params;
//     const { type, answerDropdown } = req.body;

//     // Find the check sheet by questionId
//     const checkSheet = await CheckSheet.findById(questionId);

//     if (!checkSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }

//     // Update the type and answer fields based on the selected type
//     if (type === "dropdown") {
//     //   checkSheet.addQuestionForInspect[0].type = type
//     //   checkSheet.addQuestionForInspect[0].answerDropdown = answerDropdown
//     //   checkSheet.addQuestionForInspect[0].answer = ""// Clear the answer field when type is dropdown
//     // } else {
//       checkSheet.addQuestionForInspect[0].type = type;
//       checkSheet.addQuestionForInspect[0].answer = answerDropdown[0]; // Set the first option as the answer when type is not dropdown
//       checkSheet.addQuestionForInspect[0].answerDropdown = []; // Clear the answerDropdown field when type is not dropdown
//     }

//     // Save the updated check sheet
//     await checkSheet.save();

//     res.json(checkSheet);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

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

//   let data = [questionsWithAnswer,questionsWithoutAnswer]
//     return res.status(200).json(
//       // questionsWithAnswer,
//       // questionsWithoutAnswer,
//       data
//     );
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
exports.CheckAnswer = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findOne({ _id: req.params.id });

    console.log(checkSheet);

    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }

    const questionsWithAnswer = checkSheet.addQuestionForInspect.filter(
      (q) => q.answer !== "select" || q.isAnswer === true
    );
    const questionsWithoutAnswer = checkSheet.addQuestionForInspect.filter(
      (q) => q.answer === "select" && q.isAnswer === false
    );

    // Shuffle the arrays
    shuffleArray(questionsWithAnswer);
    shuffleArray(questionsWithoutAnswer);

    return res.status(200).json([questionsWithAnswer, questionsWithoutAnswer]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
// Function to shuffle an array in-place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// DELETE a check sheet by ID
exports.deleteCheckSheet = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findByIdAndDelete(req.params.id);
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json({ message: "Check sheet deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// READ a single check sheet by ID
exports.getCheckSheetBySiteId = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.find({ siteId: req.params.id });
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json({ msg: checkSheet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getCheckSheetBySiteIdandchecksheetid = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.find({
      siteId: req.params.siteid,
      _id: req.params.checsheet,
    });
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json({ msg: checkSheet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// UPDATE a check sheet by ID
exports.updatefields = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          nameOfCheckSheet: req.body.nameOfCheckSheet,
          revisionNumber: req.body.revisionNumber,
          type: req.body.type,
          uploadDocument: req.body.uploadDocument,
          QA_CA_ID: req.body.QA_CA_ID,
          client: req.body.client,
          circle: req.body.circle,
          auditDate: req.body.auditDate,
          address: req.body.address,
          location: req.body.location,
          siteName: req.body.siteName,
          siteId: req.body.siteId,
          uploadDocument: req.body.uploadDocument,
        },
      },
      { new: true }
    );
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json(checkSheet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// UPDATE a check sheet by ID
exports.populatesiteid = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.find({
      siteId: req.params.id,
    }).populate("siteId"); // Populate the referenced siteId field

    if (checkSheets.length === 0) {
      return res.json([]);
    }
    return res.json({ msg: checkSheets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateCheckSheetSubmitted = async (req, res) => {
  try {
    const checkSheetId = req.params.id;

    const updatedCheckSheet = await CheckSheet.findByIdAndUpdate(
      checkSheetId,
      { $set: { submitted: "true" } },
      { new: true }
    );

    if (!updatedCheckSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }

    res.status(200).json({ updatedCheckSheet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSubmittedCheckSheets = async (req, res) => {
  try {
    const submittedCheckSheets = await CheckSheet.find({ submitted: "true" });

    res.status(200).json({ submittedCheckSheets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};