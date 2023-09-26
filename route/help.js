const express = require("express");
const {helpAdmin,gethelp,updateHelpAdmin,deleteHelpAdmin} = require("../controllers/admin/help");
 const {getHelpBycustomer} = require('../controllers/user/help')
const help = express.Router();

//ADMIN
help.post("/helpAdmin", helpAdmin);
help.get("/get/help",gethelp)
help.put("/updateHelpAdmin/:id", updateHelpAdmin);
help.delete("/deleteHelpAdmin/:id", deleteHelpAdmin);

//CUSTOMER
// help.get('/getHelpBycustomer',getHelpBycustomer)



module.exports = help;  
