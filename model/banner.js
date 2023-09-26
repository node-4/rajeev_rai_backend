const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    image: {
        type: String,
        default:
          "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      }, 
})

const imagemodel = mongoose.model('banner user', imageSchema);

module.exports = imagemodel;