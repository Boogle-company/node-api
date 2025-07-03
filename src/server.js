const hbs = require("hbs");
const express = require("express");
const path = require("path");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const controllers = require("./controllers");
const checkLogin = require("./middlewares");

const app = express();
const PORT = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views/templates"));
hbs.registerPartials(path.join(__dirname, "/views/components"));

// Register Handlebars helpers
hbs.registerHelper("substring", function (str, start, end) {
    if (!str) return "";
    return str.substring(start, end);
});

hbs.registerHelper("formatDate", function (date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR");
});
hbs.registerPartials(path.join(__dirname, "views/templates/components"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session(
        {
            secret: 'b74fd31178ef97c8ecba007b746b6fd0',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1200000 }
        })
)

app.get("/auth/login", controllers.login);
app.post("/auth/login", controllers.login);
app.get("/auth/register", controllers.register);
app.post("/auth/register", controllers.register);

app.get("/", controllers.home);
app.get("/sites-admin", checkLogin, controllers.sitesAdmin);
app.post("/sites-admin", checkLogin, controllers.registerSite);
app.delete("/sites-admin/:id", checkLogin, controllers.deleteSite);

console.log(`Listen on http://localhost:${PORT}`);
app.listen(PORT);
