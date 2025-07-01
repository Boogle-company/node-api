const hbs = require("hbs");
const express = require('express')
const path = require('path')
const app = express()

const PORT = 3000

const sitesController = require("./controllers/sites.controller");

app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, "/views/templates"));
hbs.registerPartials(path.join(__dirname, "/views/components"));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.get("/", sitesController.home);

console.log(`Listen on http://localhost:${PORT}`)
app.listen(PORT)