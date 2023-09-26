

const reviewerModel = require('../../model/reviewer'); // Import the reviewer model

// Create a new reviewer
exports.createReviewer = async (req, res) => {
  try {
    const newReviewer = req.body; // Get the reviewer data from the request body
    const reviewer = await reviewerModel.create(newReviewer); // Create a new reviewer using the reviewer model

    // Send a success response with the created reviewer data
    res.status(201).json({ data: reviewer });
  } catch (err) {
    // If an error occurs, catch it and send an error response
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a reviewer by ID
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


// Retrieve all reviewers with populated audit data
exports.getAllReviewerspopulate = async (req, res) => {
  try {
    const reviewers = await reviewerModel.find()
      .populate('auditId'); // Populate the auditId field with auditName from the audit model

    // Send a success response with the retrieved reviewers data
    res.status(200).json({ data: reviewers });
  } catch (err) {
    // If an error occurs, catch it and send an error response
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve a reviewer by ID with populated audit data
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
