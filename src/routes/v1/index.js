const express = require("express");
const router = express.Router();
const controllers = require('../../controllers');

router.get("/info",controllers.infoController.info);

module.exports = router