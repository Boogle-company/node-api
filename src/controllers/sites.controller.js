const Site = require("../models/sites")
const Tag = require("../models/tags")
const { ObjectId } = require('mongodb');

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

  get = async (req, res) => {
    try {
      const sites = await Site.find();

      res.render('sites-admin', { sitesJson: JSON.stringify(sites) });
    } catch (error) {
      res.status(500).send('Erro ao buscar sites');
    }
  };

  post = async (req, res) => {
    try {
      const { url, title, description, userId, tagIds } = req.body;
      const tagIdsArray = tagIds ? tagIds.split(',').map(t => t.trim()) : [];

      const site = new Site(url, title, description, userId, tagIdsArray);
      await site.insert();

      res.redirect('/sites-admin');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao salvar site');
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const result = await Site.delete({ _id: objId });

    } catch (error) {
      console.error('Erro ao excluir site:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };
}


module.exports = new SitesController();