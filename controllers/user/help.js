const HelpModel = require('../../model/help');

// Read all help documents
module.exports.getHelpBycustomer = () => {
    return HelpModel.find({}).exec();
  };