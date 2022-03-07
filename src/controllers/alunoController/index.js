const { response } = require('express')
const db = require('../../database')
const models = require('../../models')
async function registerStudent(req, res) {
    const student = new models.AlunoModel(req.body)
    student._id = req.body.cpf
    try {

        await db.client.connect()
        await db.alunoCollection.insertOne(student)
        res.status(200).json("Aluno registrado com sucesso")
    } catch (error) {
        res.status(400).json(error.message)
    }
}
async function getStudents(req, res) {
    try {
        await db.client.connect()
        const response = await db.alunoCollection.find().toArray()
        res.status(200).json(response)

    } catch (error) {
        res.status(400).json(error.message)
    }
}
module.exports = {
    registerStudent,
    getStudents
}