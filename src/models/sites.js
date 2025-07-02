const { connect } = require("../db/connection")
const Logger = require("../logger")

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
            this._id = result.insertedId
            console.log("Site inserido:", this._id)
            client.close()
        } catch (error) {
            Logger.log("Erro ao inserir site:", error)
        }
    }

    static async update(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("sites").updateMany(filtro, {
                    $set: novosDados,
                });
            console.log("Sites atualizados:", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar sites: " + error);
        }
    }

    static async find(filtro = {}) {
        try {
            const { db, client } = await connect();
            const sites = await
                db.collection("sites").find(filtro).toArray();
            client.close();
            return sites
        } catch (error) {
            Logger.log("Erro ao buscar sites: " + error);
        }
    }

    static async delete(filtro) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("sites").deleteMany(filtro);
            console.log("Sites deletados:", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar sites: " + error);
        }
    }
}

module.exports = Site