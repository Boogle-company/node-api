const { connect } = require("../db/connection")
const Logger=require("../logger")

class User{
    constructor (name, email, password){
        this.name = name
        this.email = email
        this.password = password
    }

    async insert(){
        try{
            const { db, client} = await connect()
            const result = await db.collection("users").insertOne({
                name: this.name,
                email: this.email,
                password: this.password,
                createdAt: new Date()
            })
            console.log("Usuario inserido:", result.insertedId)
            client.close()
        }catch (error) {
            Logger.log("Erro ao inserir usuario:", error)
        }
    }

    static async update(filter, newData) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("users").updateMany(filter, {
                    $set: newData,
                });
            console.log("Usuario atualizado:", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar usuario: " + error);
        }
    }

    static async find(filter = {}) {
        try {
            const { db, client } = await connect();
            const users = await
                db.collection("users").find(filter).toArray();
            console.log("Usuarios encontrados:", users);
            client.close();
        } catch (error) {
            Logger.log("Erro ao buscar usuario: " + error);
        }
    }

    static async delete(filter) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("users").deleteMany(filter);
            console.log("Usuario deletado:", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar usuario: " + error);
        }
    }
}

module.exports = User
