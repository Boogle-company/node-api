const express = require("express");
const sitesController = require("../controllers/sites.controller");
const checkLogin = require("../middleware/checkLogin");

const router = express.Router();

router.get("/", (req, res) => {
  sitesController.home(req, res);
});

router.get("/sites-admin", checkLogin, (req, res) => {
  sitesController.sitesAdmin(req, res);
});

module.exports = router;
