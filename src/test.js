console.log("Iniciando testes.")

const Site = require("./entities/sites")

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

console.log("Teste de inserção do site: ")
insertSiteTest()