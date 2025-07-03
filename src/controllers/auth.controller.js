const authModel = require("../models/users");

class AuthController {
  async login(req, res) {
    if (req.method === "GET") {
      // Renderiza a página de login
      return res.render("login");
    }

    if (req.method === "POST") {
      const { email, password } = req.body;

      try {
        // Busca o usuário pelo e-mail
        const users = await authModel.find({ email });

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
  }

  async register(req, res) {
    if (req.method === "GET") {
      return res.render("register");
    }
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        try {
            const users = await authModel.find({ email });
            if (users.length > 0) {
            return res.render("register", { error: "E-mail já cadastrado!" });
            }

            const newUser = new authModel(name, email, password);
            await newUser.insert();
            return res.render("register", { success: "Usuário registrado com sucesso!" });
        } catch (error) {
            return res.render("register", { error: "Erro ao cadastrar usuário. Tente novamente!" });
        }
    }
  }
}

module.exports = new AuthController();
