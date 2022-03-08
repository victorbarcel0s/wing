const { response } = require('express')
const db = require('../../database')
const models = require('../../models')


async function matricular(req, res) {
    const matricula = new models.MatriculaModel(req.body)
    try {
        await db.client.connect()
        await db.matriculaCollection.insertOne(matricula)
        res.status(200).json("Matriculado com sucesso")
    } catch (error) {
        res.status(401).json(error.message)
    }


}
async function getMatriculas(req, res) {
    try {
        await db.client.connect()
        const response = await db.matriculaCollection.find().toArray()
        res.status(200).json(response)
    } catch (error) {
        res.status(401).json(error.message)

    }
}
module.exports = {
    matricular,
    getMatriculas
}