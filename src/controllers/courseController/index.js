const db = require('../../database')
const models = require('../../models')
async function getAllCourses(req, res) {
    try {
        await db.client.connect()
        response = await db.courseCollection.find().toArray()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
async function addCourse(req, res) {
    const course = new models.CursoModel(req.body)
    try {
        await db.client.connect()
        await db.courseCollection.insertOne(course)
        res.status(200).json("Adicionado com sucesso")
    } catch (error) {
        res.status(400).json(error.message)

    }

}
module.exports = {
    getAllCourses, addCourse
}