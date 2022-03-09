const { ObjectId } = require('mongodb');
const db = require('../../database');
const models = require('../../models');

async function matricular(req, res) {
    try {
        await db.client.connect();

        const matricula = new models.MatriculaModel(req.body);
        // ↑↑↑ recebeu do body

        const curso_info = await db.courseCollection.findOne({
            _id: ObjectId(matricula.courseId),
        });
        matricula.turno = curso_info.turno;
        // ↑↑↑ receber informação do curso desejado
        const user_info = await db.alunoCollection.findOne({
            _id: matricula.userId,
        });
        // ↑↑↑ receber informação do aluno a ser cadastrado

        if (user_info == null) {
            throw new Error('Usuário não encontrado');
        }
        const findTurno = await db.matriculaCollection.findOne({
            turno: curso_info.turno,
            userId: user_info._id,
        });

        if (findTurno != null) {
            throw new Error('Já matriculado em um curso nesse turno');
        }
        if (curso_info.dispVagas < 1) {
            throw new Error('Não existem vagas disponíveis nesse curso');
        }
        matricula['_id'] = `${matricula.userId}#${matricula.courseId}`;
        await db.matriculaCollection.insertOne(matricula);
        await db.courseCollection.updateOne(
            { _id: ObjectId(matricula.courseId) },
            { $inc: { dispVagas: -1 } },
        );
        // ↑↑↑ remove uma vaga da quantidade disponível

        res.status(200).json('Matriculado com sucesso');
    } catch (error) {
        res.status(401).json(error.message);
    }
}
async function getMatriculas(req, res) {
    try {
        await db.client.connect();
        const response = await db.matriculaCollection.find().toArray();
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json(error.message);
    }
}

async function encerrarMatricula(req, res) {
    try {
        const info = req.body;
        await db.client.connect();
        await db.matriculaCollection.deleteOne({
            userId: info.userId,
            courseId: info.courseId,
        });
        res.status(200).json('Removido com sucesso');
    } catch (error) {
        res.status(401).json(error.message);
    }
}
module.exports = {
    matricular,
    getMatriculas,
    encerrarMatricula,
};
