const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const siteSchema = mongoose.Schema({
        clientId: {
                type: objectid,
                ref: "User"
        },
        auditorId: {
                type: objectid,
                ref: "User"
        },
        reviewerId: {
                type: objectid,
                ref: "User"
        },
        subAdminId: {
                type: objectid,
                ref: "User"
        },
        checkSheetId: {
                type: objectid,
                ref: "checkSheet"
        },
        siteId: {
                type: objectid,
                ref: "User"
        },
        description: {
                type: String
        },
        actionBy: {
                type: String,
                enum: ["auditor", "client", "reviewer", "subAdmin",],
                default: "",
        },
});
const siteModel = mongoose.model("logHistory", siteSchema);
module.exports = siteModel;
