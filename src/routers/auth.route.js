const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login'); // Renderiza a tela de login
});

router.post('/login', (req, res) => {
  authController.login(req, res); // Processa o login
});

router.get("/register", (req, res) => {
  res.render("register"); // Renderiza a página de registro
});

router.post("/register", (req, res) => {
  authController.register(req, res);
});

router.get("/register", (req, res) => authController.register(req, res));
router.post("/register", (req, res) => authController.register(req, res));

module.exports = router;
