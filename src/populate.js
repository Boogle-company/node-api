const Site = require("./models/sites")
const Tag = require("./models/tags")
const Search = require("./models/searches")
const User = require("./models/users")

async function populate() {
    const felipe = new User(
        "Felipe",
        "felipe@gmail.com",
        "felipe123"
    )
    const jefferson = new User(
        "Jefferson",
        "jefferson@gmail.com",
        "jefferson123"
    )
    const matheus = new User(
        "Matheus",
        "matheus@gmail.com",
        "matheus123"
    )
    const raphael = new User(
        "Raphael",
        "raphael@gmail.com",
        "raphael123"
    )
    const gabriel = new User(
        "Gabriel",
        "gabriel@gmail.com",
        "gabriel123"
    )

    await felipe.insert()
    await jefferson.insert()
    await matheus.insert()
    await raphael.insert()
    await gabriel.insert()

    const wikiTag = new Tag(
        "wiki",
        "wiki"
    )

    const freeTag = new Tag(
        "free",
        "free"
    )

    const paidTag = new Tag(
        "paid",
        "paid"
    )

    const tutorialTag = new Tag(
        "tutorial",
        "tutorial"
    )

    const ecommerceTag = new Tag(
        "ecommerce",
        "ecommerce"
    )

    const socialTag = new Tag(
        "social",
        "social"
    )

    const noticeTag = new Tag(
        "notice",
        "notice"
    )

    const educationTag = new Tag(
        "education",
        "education"
    )

    await wikiTag.insert()
    await freeTag.insert()
    await paidTag.insert()
    await tutorialTag.insert()
    await ecommerceTag.insert()
    await socialTag.insert()
    await noticeTag.insert()
    await educationTag.insert()

    const neyYorkTimes = new Site(
        "https://www.nytimes.com",
        "New York Times",
        "New York Times",
        felipe._id,
        [wikiTag._id, noticeTag._id, educationTag._id, freeTag._id]
    )

    const google = new Site(
        "https://www.google.com",
        "Google",
        "Google",
        felipe._id,
        [wikiTag._id, noticeTag._id, educationTag._id, freeTag._id]
    )

    const amazon = new Site(
        "https://www.amazon.com",
        "Amazon",
        "Amazon",
        felipe._id,
        [ecommerceTag._id, paidTag._id, socialTag._id, noticeTag._id]
    )

    const moodle = new Site(
        "https://www.moodle.com",
        "Moodle",
        "Moodle",
        jefferson._id,
        [educationTag._id, paidTag._id]
    )

    const linkedin = new Site(
        "https://www.linkedin.com",
        "LinkedIn",
        "LinkedIn",
        matheus._id,
        [socialTag._id, paidTag._id]
    )

    const youtube = new Site(
        "https://www.youtube.com",
        "YouTube",
        "YouTube",
        raphael._id,
        [socialTag._id, paidTag._id, freeTag._id]
    )

    const gabaritaIA = new Site(
        "https://www.gabaritaia.com",
        "Gabarita IA",
        "Gabarita IA",
        felipe._id,
        [tutorialTag._id, paidTag._id, freeTag._id]
    )

    await neyYorkTimes.insert()
    await google.insert()
    await amazon.insert()
    await moodle.insert()
    await linkedin.insert()
    await youtube.insert()
    await gabaritaIA.insert()
}

populate()