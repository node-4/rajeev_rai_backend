const CheckSheet = require("../admin/CheckSheet");

exports.getCheckSheetsWithAnswer = async (req, res) => {
    try {
      const questionIndex = req.query.questionIndex;
      const answer = req.query.answer;
  
      const checkSheets = await CheckSheet.find({
        [`addQuestionForInspect.${questionIndex}.answer`]: answer,
      });
  
      res.status(200).json({ checkSheets });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
