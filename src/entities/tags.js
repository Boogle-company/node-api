const { connect } = require("../db/connection")

class Tag {
    constructor(name, slug){
        this.name = name
        this.slug = slug
    }

    async insert(){
        try{
            const {db, client} = await connect();
            const result = await db.collection("tags").insertOne({
                name: this.name,
                tag: this.tag,
            });
            console.log("Tag inserida: ", result.insertedId);
            client.close();
        } catch (error){
            console.log("Erro ao inserir tag: ", error);
        }
    }
}

module.exports = Tag