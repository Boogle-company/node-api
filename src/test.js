console.log("Iniciando testes.")

const Site = require("./entities/sites")
const Tag = require("./entities/tags")
const Search = require("./entities/searches")
const User = require("./entities/users")

async function insertSiteTest() {
    const site = new Site(
        "https://www.google.com",
        "Google",
        "Site de buscar, nosso pequeno concorrente",
        "1212",
        ["12", "25"],
    )
    await site.insert()
}

async function insertTagTest() {
    const tag = new Tag(
        "educação",
        "educacao",
    )
    await tag.insert()
}

async function insertSearchTest() {
    const search = new Search(
        "bet365",
        "none"
    )
    await search.insert()
}

async function insertUserTest(){
    const user = new User(
        "Fulano",
        "fulano@gmail.com",
        "fulano123"
    )
    await user.insert()
}

// Teste de inserção do site
insertSiteTest()

// Teste de inserção do tag
insertTagTest()

// Teste de inserção do search
insertSearchTest()

// Teste de inserção do usuario
insertUserTest()