const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  clientName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  designation: {
    type: String,
  },
  circle_state: {
    type: String,
  },
  representativeName: {
    type: String,
  },
  siteId: {
    type: String,
  },
});

const clientModel = mongoose.model("client", clientSchema);

module.exports = clientModel;
