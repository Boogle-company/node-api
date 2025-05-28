console.log("Iniciando testes.")

const Site = require("./entities/sites")
const Tag = require("./entities/tags")

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

// console.log("Teste de inserção do site: ")
insertSiteTest()

// console.log("Teste de inserção do tag: ")
insertTagTest()