const { connect } = require("../db/connection")

class Site {
    constructor(url, title, description, adminId, tagIds) {
        this.url = url
        this.title = title
        this.description = description
        this.adminId = adminId
        this.tagIds = tagIds
    }

    async insert() {
        try {
            const { db, client } = await connect()
            const result = await db.collection("sites").insertOne({
                url: this.url,
                title: this.title,
                description: this.description,
                adminId: this.adminId,
                tagIds: this.tagIds,
                createdAt: new Date(),
            })
            console.log("Site inserido:", result.insertedId)
            client.close()
        } catch (error) {
            console.log("Erro ao inserir site:", error)
        }
    }
}

module.exports = Site