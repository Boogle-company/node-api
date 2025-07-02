const express = require("express");
const sitesController = require("../controllers/sites.controller");

const router = express.Router();

router.get("/", (req, res) => {
  sitesController.home(req, res);
});

module.exports = router;
