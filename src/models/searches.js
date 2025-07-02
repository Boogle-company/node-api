const { connect } = require("../db/connection");
const Logger = require("../logger")

class Search {
    constructor(query, siteIds = {}) {
        this.query = query;
        this.siteIds = siteIds;
    }

    async insert() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("searches").insertOne({
                query: this.query,
                siteIds: this.siteIds,
                createAt: new Date()
            });
            this._id = result.insertedId
            console.log("Busca inserir: ", this._id);
            client.close();
        } catch (error) {
            Logger.log("Erro ao inserir busca: ", error);
        }
    }
    
    static async update(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("searches").updateMany(filtro, {
                    $set: novosDados,
                });
            console.log("Searches atualizadas:", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar searches: " + error);
        }
    }

    static async find(filtro = {}) {
        try {
            const { db, client } = await connect();
            const sites = await
                db.collection("searches").find(filtro).toArray();
            client.close();
            return sites
        } catch (error) {
            Logger.log("Erro ao buscar searches: " + error);
        }
    }

    static async delete(filtro) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("searches").deleteMany(filtro);
            console.log("Searches deletadas:", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar searches: " + error);
        }
    }
}

module.exports = Search;