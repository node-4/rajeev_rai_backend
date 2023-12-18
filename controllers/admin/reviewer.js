const reviewerModel = require('../../model/userCreate'); // Import the reviewer model
exports.createReviewer = async (req, res) => {
  try {
    req.body.role = "reviewer";
    const newReviewer = req.body;
    const reviewer = await reviewerModel.create(newReviewer);
    res.status(201).json({ data: reviewer });
  } catch (err) {
    // If an error occurs, catch it and send an error response
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
exports.updateReviewerById = async (req, res) => {
  try {
    const reviewerId = req.params.id; // Get the reviewer ID from the request parameters
    const updatedReviewer = req.body; // Get the updated reviewer data from the request body

    const reviewer = await reviewerModel.findByIdAndUpdate(reviewerId, updatedReviewer, { new: true }); // Update the reviewer by ID using the reviewer model

    if (!reviewer) {
      // If reviewer is not found, send an error response
      return res.status(404).json({ error: 'Reviewer not found' });
    }

    // If reviewer is updated successfully, send a success response with updated reviewer data
    res.status(200).json({ data: reviewer });
  } catch (err) {
    // If an error occurs, catch it and send an error response
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
exports.deleteReviewerById = async (req, res) => {
  try {
    const reviewer = await reviewerModel.findByIdAndDelete(req.params.id);
    if (!reviewer) {
      res.status(404).json({ message: "Reviewer not found" });
      return;
    }
    res.json({ message: "Reviewer deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting reviewer" });
  }
};
exports.getAllReviewerspopulate = async (req, res) => {
  try {
    const reviewers = await reviewerModel.find({ role: "reviewer" }).populate('auditId');
    res.status(200).json({ data: reviewers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getReviewerByIdpopulate = async (req, res) => {
  try {
    const reviewerId = req.params.id; // Get the reviewer ID from the request parameters
    const reviewer = await reviewerModel.findById(reviewerId)
      .populate('auditId'); // Populate the auditId field with auditName from the audit model

    if (!reviewer) {
      // If reviewer is not found, send an error response
      return res.status(404).json({ error: 'Reviewer not found' });
    }

    // If reviewer is found, send a success response with reviewer data
    res.status(200).json({ data: reviewer });
  } catch (err) {
    // If an error occurs, catch it and send an error response
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
