const { connect } = require("../db/connection");

class Search {
    constructor(query, filters = {}) {
        this.query = query;
        this.filters = filters;
        this.results = [];
        this.executionTime = 0;
    }

    async insert() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("searches").insertOne({
                query: this.query,
                filters: this.filters,
                results: this.results,
                executionTime: this.executionTime,
                timestamp: new Date()
            });
            console.log("Busca registrada: ", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao registrar busca: ", error);
        }
    }
}

module.exports = Search;