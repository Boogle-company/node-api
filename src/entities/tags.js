const { connect } = require("../db/connection")

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
                tag: this.tag,
            });
            console.log("Tag inserida: ", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao inserir tag: ", error);
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
            console.log("Tags encontradas:", tags);
            client.close();
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