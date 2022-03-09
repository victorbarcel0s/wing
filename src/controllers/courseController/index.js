const { ObjectId } = require('mongodb');
const db = require('../../database');
const models = require('../../models');

async function getAllCourses(req, res) {
    try {
        await db.client.connect();
        response = await db.courseCollection.find().toArray();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

async function addCourse(req, res) {
    const course = new models.CursoModel(req.body);
    course.dispVagas = course.maxVagas;
    try {
        await db.client.connect();
        await db.courseCollection.insertOne(course);
        res.status(200).json('Adicionado com sucesso');
    } catch (error) {
        res.status(400).json(error.message);
    }
}

async function deleteCourse(req, res) {
    const cursoId = req.body.cursoId;
    try {
        await db.client.connect();
        verifyExists = await db.courseCollection.findOne({
            _id: ObjectId(cursoId),
        });
        verifyMatriculados = await db.matriculaCollection.findOne({
            courseId: cursoId,
        });
        if (verifyExists == null) {
            res.status(404).json('Curso não encontrado');
        } else if (verifyMatriculados == null) {
            await db.courseCollection.deleteOne({ _id: ObjectId(cursoId) });
            res.status(200).json('Curso removido com sucesso');
        } else res.status(401).json('Existem alunos matriculados nesse curso');
    } catch (error) {
        if (
            error.message ==
            'Argument passed in must be a string of 12 bytes or a string of 24 hex characters'
        ) {
            res.status(400).json(
                'O elemento passado não foi reconhecido como um ID válido',
            );
        } else {
            res.status(400).json(error.message);
        }
    }
}

async function updateCourse(req, res) {
    try {
        const infoToUpdate = new models.CursoModel(req.body);
        await db.client.connect();
        const response = await db.courseCollection.updateOne(
            { _id: infoToUpdate._id },
            {
                $set: infoToUpdate,
            },
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    getAllCourses,
    addCourse,
    deleteCourse,
    updateCourse,
};
