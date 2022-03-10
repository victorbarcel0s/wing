const { ObjectId } = require('mongodb');
const db = require('../../database');
const models = require('../../models');

async function registerStudent(req, res) {
    const student = new models.AlunoModel(req.body);

    try {
        await db.client.connect();
        const verifyId = await db.alunoCollection.findOne({
            _id: student._id,
        });
        // ↑↑↑ verifica se o id ja foi cadastrado no banco de dados
        const verifyEmail = await db.alunoCollection.findOne({
            email: student.email,
        });
        // ↑↑↑ verifica se o email ja foi cadastrado no banco de dados
        if (verifyId != null) {
            throw new Error('Id ja registrado');
        }

        // ↑↑↑ só avança se id nao tiver sido cadastrado
        if (verifyEmail != null) {
            throw new Error('Email ja registrado');
        }

        // ↑↑↑ só avança se email nao tiver sido cadastrado
        await db.alunoCollection.insertOne(student);
        // ↑↑↑ registrou aluno

        res.status(200).json('Aluno registrado com sucesso');
        // ↑↑↑ retornou sucesso
    } catch (error) {
        res.status(400).json(error.message);
        // ↑↑↑ retornou erro
    }
}

async function getStudents(req, res) {
    try {
        await db.client.connect();
        // ↑↑↑ conectou o banco
        const response = await db.alunoCollection.find().toArray();
        // ↑↑↑ pegou todos os alunos
        res.status(200).json(response);
        // ↑↑↑ retornou sucesso
    } catch (error) {
        res.status(400).json(error.message);
    }
}

async function deleteStudent(req, res) {
    const _id = req.body._id;
    try {
        await db.client.connect();
        const verifyExists = await db.alunoCollection.findOne({ _id: _id });
        // ↑↑↑ verificou se o aluno existe
        if (verifyExists == null) {
            throw new Error('Aluno não encontrado');
        }

        const matricula = await db.matriculaCollection.findOne({
            userId: _id,
        });
        // ↑↑↑ verificou se ta matriculado e pegou a matricula do aluno
        if (matricula == null) {
            // ↑↑↑ validando a matricula pra ver se ele esta matriculado, só avança dse não estiver
            await db.alunoCollection.deleteOne({ _id: _id });
            // ↑↑↑ deletou o aluno
            res.status(200).json('Aluno excluído com sucesso');
            // ↑↑↑ retornou sucesso
        } else {
            const verifyNota = await db.notasCollection.findOne({
                matriculaId: matricula['_id'].toString(),
            }); // verifica se há notas nessa matricula
            // ↑↑↑ verifica se existe nota para tal aluno
            if (verifyNota != null) {
                throw new Error(
                    'Aluno não pode ser excluido pois já realizou avaliações',
                );
            }

            await db.alunoCollection.deleteOne({ _id: _id });
            // ↑↑↑ excluiu
            res.status(200).json('Aluno excluído com sucesso');
            // ↑↑↑ retornou sucesso
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

async function updateStudent(req, res) {
    try {
        const infoToUpdate = new models.AlunoModel(req.body);
        await db.client.connect();
        const response = await db.alunoCollection.updateOne(
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
    registerStudent,
    getStudents,
    deleteStudent,
    updateStudent,
};
