const clientModel = require('../../model/client'); // Import the clientModel module

// Controller function to create a new client
exports.createClient = async (req, res) => {
  try {
    // Create a new client object from the request body
    const newClient = new clientModel(req.body);

    // Save the new client object to the database
    const savedClient = await newClient.save();

    // Send the saved client as the response
    res.status(201).json(savedClient);
  } catch (err) {
    // Handle any errors that occur during the database operation
    console.error('Error creating client:', err);
    return res.status(500).json({ error: 'Failed to create client' });
  }
};

// Controller function to get a client by ID
exports.getClientById = async (req, res) => {
  try {
    // Fetch the client by ID from the database
    const client = await clientModel.findById(req.params.id);

    // Check if the client was found
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



// Controller function to get a client by ID
exports.getAllClient = async (req, res) => {
  try {
    // Fetch the client by ID from the database
    const client = await clientModel.find();

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



// Controller function to update a client by ID
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

// Controller function to delete a client by ID
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
