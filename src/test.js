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

    await Site.find()

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

    await Site.find()

    console.log("====================================================================================\n")

    await Site.delete(deleteFilter)

    console.log("\nSites depois do DELETE")

    await Site.find()

    console.log("====================================================================================")
}

async function testTags() {
    const newTag = new Tag(
        "educação",
        "educacao",
    )

    await newTag.insert()

    const updateFilter = {
        name: "educação"
    }
    const deleteFilter = {
        name: "Matemática"
    }

    console.log("Tags depois do INSERT")

    await Tag.find()

    console.log("====================================================================================\n")

    const updateTag = new Tag(
        "Matemática",
        "Matematica"
    )

    await Tag.update(updateFilter, updateTag)

    console.log("\nTags depois do UPDATE")

    await Tag.find()

    console.log("====================================================================================\n")

    await Tag.delete(deleteFilter)

    console.log("\nTags depois do DELETE")

    await Tag.find()

    console.log("====================================================================================")
}

async function insertSearchTest() {
    const search = new Search(
        "bet365",
        ["1", "2"]
    )
    await search.insert()
    const updateFilter = {
        query: "bet365"
    }
    const deleteFilter = {
        query: "Steam"
    }

    console.log("Searches depois do INSERT")

    await Search.find()

    console.log("====================================================================================\n")

    const updateSearch = new Search(
        "Steam",
        "4"
    )

    await Search.update(updateFilter, updateSearch)

    console.log("\nSearches depois do UPDATE")

    await Search.find()

    console.log("====================================================================================\n")

    await Search.delete(deleteFilter)

    console.log("\nSearches depois do DELETE")

    await Search.find()

    console.log("====================================================================================")
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
    await testTags()

    // Teste de inserção do search
    await insertSearchTest()

    // Teste de inserção do usuario
    await insertUserTest()
}

testBoogle()