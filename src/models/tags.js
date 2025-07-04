const { connect } = require("../db/connection")
const Logger = require("../logger")

class Tag {
    constructor(name, slug) {
        this.name = name
        this.slug = slug
    }

    async insert() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("tags").insertOne({
                name: this.name,
                slug: this.slug,
            });
            this._id = result.insertedId
            console.log("Tag inserida: ", this._id);
            client.close();
        } catch (error) {
            Logger.log("Erro ao inserir tag: ", error);
        }
    }

    static async update(filter, newData) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("tags").updateMany(filter, {
                    $set: newData,
                });
            console.log("Tags atualizadas:", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar tags: " + error);
        }
    }

    static async find(filter = {}) {
        try {
            const { db, client } = await connect();
            const tags = await
                db.collection("tags").find(filter).toArray();
            client.close();
            return tags
        } catch (error) {
            Logger.log("Erro ao buscar tags: " + error);
        }
    }

    static async delete(filter) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("tags").deleteMany(filter);
            console.log("Tags deletadas:", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar tags: " + error);
        }
    }
}

module.exports = Tag