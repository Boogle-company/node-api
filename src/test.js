console.log("Iniciando testes.")

const Site = require("./entities/sites")
const Tag = require("./entities/tags")
const Search = require("./entities/searches")
const User = require("./entities/users")

async function testSites() {
    const newSite = new Site(
        "https://www.moodle.com",
        "Moodle",
        "Site de ensino",
        "1212",
        ["12", "25"],
    )

    await newSite.insert()

    const updateFilter = {
        title: "Moodle"
    }
    const deleteFilter = {
        title: "Gabarita IA"
    }

    console.log("Sites depois do INSERT")

    await Site.search()

    console.log("====================================================================================\n")

    const updateSite = new Site(
        "https://www.gabaritaia.com",
        "Gabarita IA",
        "Melhor site de estudos para o Enem",
        "1212",
        ["12", "25"],
    )

    await Site.update(updateFilter, updateSite)

    console.log("\nSites depois do UPDATE")

    await Site.search()

    console.log("====================================================================================\n")

    await Site.delete(deleteFilter)

    console.log("\nSites depois do DELETE")

    await Site.search()

    console.log("====================================================================================")
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

async function insertUserTest() {
    const user = new User(
        "Fulano",
        "fulano@gmail.com",
        "fulano123"
    )
    await user.insert()
}

async function testBoogle() {
    // Teste de inserção do site
    await testSites()

    // Teste de inserção do tag
    await insertTagTest()

    // Teste de inserção do search
    await insertSearchTest()

    // Teste de inserção do usuario
    await insertUserTest()
}

testBoogle()