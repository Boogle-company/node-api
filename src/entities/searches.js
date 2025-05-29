const { connect } = require("../db/connection");

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
            console.log("Busca registrada: ", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao registrar busca: ", error);
        }
    }
}

module.exports = Search;