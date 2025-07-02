const Site = require("../models/sites")
const Tag = require("../models/tags")

class SitesController {
  async home(req, res, next) {
    const sites = await Site.find()
    const tagIds = sites.flatMap(site => site.tagIds)
    const tags = await Tag.find({ _id: { $in: tagIds } })

    const sitesWithTags = sites.map(site => {
      const siteTagIds = site.tagIds
      const siteTags = tags.filter(tag => siteTagIds.includes(tag._id))
      return {
        ...site,
        tags: siteTags
      }
    })

    res.render("home/home", {
      sites: sitesWithTags
    });
  }
}

module.exports = new SitesController();
