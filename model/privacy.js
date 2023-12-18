const mongoose = require("mongoose");

const privacySchema = mongoose.Schema({
   privacy: { type: String },
   terms: { type: String },
   type: {
      type: String,
      enum: ['privacy', 'term']
   },
})

const privacy = mongoose.model('privacy', privacySchema);

module.exports = privacy