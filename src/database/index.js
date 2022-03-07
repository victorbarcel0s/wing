const { MongoClient } = require('mongodb');

const {
    DB_HOST,
    DB_DATABASE,
    DB_COLLECTION_CURSOS,
    DB_COLLECTION_ALUNOS
} = process.env
const client = new MongoClient(DB_HOST);
const courseCollection = client.db(DB_DATABASE).collection(DB_COLLECTION_CURSOS)
const alunoCollection = client.db(DB_DATABASE).collection(DB_COLLECTION_ALUNOS)



module.exports = { client, courseCollection, alunoCollection }