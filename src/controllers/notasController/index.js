const db = require('../../database')
const models = require('../../models')

async function postNota(req, res) {
    const nota = new models.NotaModel(req.body)
    try {
        await db.client.connect()
        await db.notasCollection.insertOne(nota)
        res.status(200).json("Nota cadastrada com sucesso")
    } catch (error) {
        res.status(401).json(error.message)
    }
}
async function getNotas(req, res) {
    try {
        await db.client.connect()
        const response = await db.notasCollection.find().toArray()
        res.status(200).json(response)
    } catch (error) {
        res.status(401).json(error.message)
    }
}
module.exports = {
    postNota,
    getNotas
}