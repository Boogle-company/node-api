const express = require("express");
const sitesController = require("../controllers/sites.controller");
const checkLogin = require("../middleware/checkLogin");

const router = express.Router();

router.get("/", (req, res) => {
  sitesController.home(req, res);
});

router.get("/sites-admin", checkLogin, (req, res) => {
  sitesController.get(req, res);
});
router.post("/sites-admin", checkLogin, (req, res) => {
  sitesController.post(req, res);
});
router.delete("/sites-admin/:id", checkLogin, (req, res) => {
  sitesController.delete(req, res);
});
module.exports = router;
