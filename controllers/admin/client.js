const clientModel = require('../../model/userCreate'); // Import the clientModel module
exports.createClient = async (req, res) => {
  try {
    const user = await clientModel.findOne({ email, role: "client" });
    if (user) {
      return res.status(409).json({ status: 409, message: "client already Exit" });
    } else {
      req.body.role = "client";
      const newClient = new clientModel(req.body);
      const savedClient = await newClient.save();
      res.status(201).json(savedClient);
    }
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error('Error creating client:', err);
    return res.status(500).json({ error: 'Failed to create client' });
  }
};
exports.getClientById = async (req, res) => {
  try {
    // Fetch the client by ID from the database
    const client = await clientModel.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Send the client as the response
    res.status(200).json(client);
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error('Error getting client by ID:', err);
    return res.status(500).json({ error: 'Failed to get client' });
  }
};
exports.getAllClient = async (req, res) => {
  try {
    // Fetch the client by ID from the database
    const client = await clientModel.find({ role: "client" });

    // Check if the client was found
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Send the client as the response
    res.status(200).json(client);
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error('Error getting client by ID:', err);
    res.status(500).json({ error: 'Failed to get client' });
  }
};
exports.updateClientById = async (req, res) => {
  try {
    // Fetch the client by ID from the database and update its properties
    const updatedClient = await clientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Check if the client was found
    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Send the updated client as the response
    res.status(200).json(updatedClient);
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error('Error updating client by ID:', err);
    return res.status(500).json({ error: 'Failed to update client' });
  }
};
exports.deleteClientById = async (req, res) => {
  try {
    // Fetch the client by ID from the database and delete it
    const deletedClient = await clientModel.findByIdAndDelete(req.params.id);

    // Check if the client was found
    if (!deletedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Send a success message as the response
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error('Error deleting client by ID:', err);
    return res.status(500).json({ error: 'Failed to delete client' });
  }
};
