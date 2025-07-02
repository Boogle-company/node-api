
class SitesController {
  async home(req, res, next) {
    res.send("NOT IMPLEMENTED: Site Home Page");
    // res.render("sites/home");
  }
}

module.exports = new SitesController();
