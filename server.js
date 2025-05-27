//Felipe Maciel Scalco
//RA: 2565838

const http = require('http')
const fs = require('fs')

const PORT = 3000

const server = http.createServer((req, res) => {})

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
