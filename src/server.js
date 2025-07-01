const hbs = require("hbs");
const express = require("express");
const path = require("path");
const authRoutes = require("./routers/auth.route.js");
const sitesController = require("./controllers/sites.controller");

const app = express();
const PORT = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/templates"));
hbs.registerPartials(path.join(__dirname, "/views/components"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", sitesController.home);
app.use("/", authRoutes);

console.log(`Listen on http://localhost:${PORT}`);
app.listen(PORT);
