const express = require("express");
const landControllers = require("../controllers/admin/banner");

const userBannerRouter = express.Router();

userBannerRouter.post("/", landControllers.addlandtoBanner);
userBannerRouter.get("/", landControllers.getland);
userBannerRouter.get("/:id", landControllers.getlandById);
userBannerRouter.put("/:id", landControllers.landUpdate);
userBannerRouter.delete("/:id", landControllers.Deleteland);

module.exports = userBannerRouter;
