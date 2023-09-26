const HelpModel = require('../../model/help');

// Create a new help document
module.exports.helpAdmin = async (req, res) => {
  try {
    const newHelpDoc = await HelpModel.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      enquiry: req.body.enquiry,
    });
    console.log(newHelpDoc)

    return res.status(200).send(newHelpDoc)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error.message, name: error.name });
  }
}


// Read a help document by ID
// const getHelpById = (id) => {
//   return HelpModel.findById(id).exec();
// };

// Read all help documents
module.exports.gethelp = async (req, res) => {
  try {
    const data = await HelpModel.find()
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Update a help document by ID
module.exports.updateHelpAdmin = async (req, res) => {
  try {
    const data = await HelpModel.findByIdAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      enquiry: req.body.enquiry,
    }).exec();
    return res.status(200).send({ msg: "updated", data })
  } catch {
    return res.status(400).json({ message: error.message });
  }
}

// Delete a help document by ID
module.exports.deleteHelpAdmin = async (req, res) => {
  try {
    await HelpModel.findByIdAndDelete({ _id: req.params.id }).exec();
    return res.status(200).send({ msg: "deleted" })
  } catch {
    return res.status(400).json({ message: error.message });
  }
}

