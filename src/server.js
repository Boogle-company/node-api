const hbs = require("hbs");
const express = require("express");
const path = require("path");
const authRoutes = require("./routers/auth.route.js");
const sitesRoutes = require("./routers/sites.route.js");
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

app.use("/", sitesRoutes);
app.use("/auth", authRoutes);
app.use("/sites-admin", sitesRoutes);
console.log(`Listen on http://localhost:${PORT}`);
app.listen(PORT);
