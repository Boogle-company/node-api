const asyncHandler = require("express-async-handler");
const Site = require("./models/sites");
const Tag = require("./models/tags");
const Users = require("./models/users");
const { ObjectId } = require('mongodb');

exports.login = asyncHandler(async (req, res, next) => {
  if (req.method === "GET") {
    // Renderiza a página de login
    return res.render("login");
  }

  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Busca o usuário pelo e-mail
      const users = await Users.find({ email });

      // Verifica se o usuário existe
      if (users.length === 0) {
        return res.render("login", { error: "Usuário não encontrado!" });
      }

      const user = users[0];

      // Verifica se a senha é válida
      if (user.password !== password) {
        return res.render("login", { error: "Senha inválida!" });
      }

      // Redireciona para uma página após login bem-sucedido
      req.session.logado = true;
      req.session.user = user;
      return res.redirect("/sites-admin");
    } catch (error) {
      // Trata erros gerais
      return res.render("login", { error: "Erro ao processar login. Tente novamente." });
    }
  }
});

exports.register = asyncHandler(async (req, res, next) => {
  if (req.method === "GET") {
    return res.render("register");
  }
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      const users = await Users.find({ email });
      if (users.length > 0) {
        return res.render("register", { error: "E-mail já cadastrado!" });
      }

      const newUser = new Users(name, email, password);
      await newUser.insert();
      return res.render("register", { success: "Usuário registrado com sucesso!" });
    } catch (error) {
      return res.render("register", { error: "Erro ao cadastrar usuário. Tente novamente!" });
    }
  }
});

exports.home = asyncHandler(async (req, res, next) => {
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
});

exports.sitesAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = req.session.user;
    const sites = await Site.find({ userId: user._id });

    res.render('sites-admin', { sitesJson: JSON.stringify(sites), user: user });
  } catch (error) {
    res.status(500).send('Erro ao buscar sites');
  }
});

exports.registerSite = asyncHandler(async (req, res, next) => {
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
});

exports.deleteSite = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const result = await Site.delete({ _id: new ObjectId(String(id)) });
    res.status(200).json({ message: 'Site excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir site:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});