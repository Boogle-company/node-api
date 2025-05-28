 const { connect } = require("../db/connection")

class Site {
    constructor(url, title, description, userId, tagIds) {
        this.url = url
        this.title = title
        this.description = description
        this.userId = userId
        this.tagIds = tagIds
    }

    async insert() {
        try {
            const { db, client } = await connect()
            const result = await db.collection("sites").insertOne({
                url: this.url,
                title: this.title,
                description: this.description,
                userId: this.userId,
                tagIds: this.tagIds,
                createdAt: new Date()
            })
            console.log("Site inserido:", result.insertedId)
            client.close()
        } catch (error) {
            console.log("Erro ao inserir site:", error)
        }
    }
}

module.exports = Site