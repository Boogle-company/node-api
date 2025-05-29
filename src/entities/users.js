const { connect } = require("../db/connection")

class User{
    constructor (name, email, password){
        this.name = name
        this.email = email
        this.password = password
    }

    async insert(){
        try{
            const { db, client} = await connect()
            const result = await db.collection("user").insertOne({
                name: this.name,
                email: this.email,
                password: this.password,
                createdAt: new Date()
            })
            console.log("User inserido:", result.insertedId)
            client.close()
        }catch (error) {
            console.log("Erro ao inserir user:", error)
        }
    }
}

module.exports = User