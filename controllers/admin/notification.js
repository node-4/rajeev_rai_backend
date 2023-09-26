const NotificationModel = require("../../model/notification")

exports.sendNotifications = async (req, res) => {
  try {
    const notification = new NotificationModel(req.body );
    const result = await notification.save();
    return res.status(200).send(result)
  }  catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Error creating notification' });
  }
};

exports.getallnotification = async (req ,res ) => {
  try {
    const notifications = await NotificationModel.find();
    return res.status(200).send(notifications)
  }  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating notification' });
  }
};

exports.getNotification = async (req ,res ) => {
  try {
    const notification = await NotificationModel.findById(req.params.id);
    return res.status(200).send(notification)
  }  catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Error creating notification' });
  }
};

exports.updateNotification = async (req , res) => {
  try {
    const updatedNotification = await NotificationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).send(updatedNotification)
  }  catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Error creating notification' });
  }
};

exports.deleteNotification = async (req , res) => {
  try {
    const deletedNotification = await NotificationModel.findByIdAndDelete(req.params.id);
    return res.status(200).send(deletedNotification)
  }  catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Error creating notification' });
  }
};
