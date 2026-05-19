const Paper = require("../models/Paper");

// UPLOAD PAPER
const uploadPaper = async (req, res) => {
  console.log("File:", req.file);
  console.log("Body:", req.body);
  const { subjectId, examYear, semester } = req.body;
  try {
    const paper = await Paper.create({
      subjectId,
      examYear,
      semester,
      fileUrl: req.file.path,
      fileName: req.file.originalname,
    });
    res.status(201).json({ message: "Paper uploaded successfully", paper });
  } catch (error) {
    console.log("UploadPaper error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET PAPERS BY SUBJECT
const getPapers = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const papers = await Paper.find({ subjectId }).sort({ examYear: -1 });
    res.json(papers);
  } catch (error) {
    console.log("GetPapers error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE PAPER
const deletePaper = async (req, res) => {
  try {
    await Paper.findByIdAndDelete(req.params.id);
    res.json({ message: "Paper deleted successfully" });
  } catch (error) {
    console.log("DeletePaper error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadPaper, getPapers, deletePaper };
