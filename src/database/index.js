const { MongoClient } = require('mongodb');

const {
    DB_HOST,
    DB_DATABASE,
    DB_COLLECTION_CURSOS,
    DB_COLLECTION_ALUNOS,
    DB_COLLECTION_MATRICULAS,
    DB_COLLECTION_NOTAS,
} = process.env;
const client = new MongoClient(DB_HOST);
const db = client.db(DB_DATABASE);
const courseCollection = db.collection(DB_COLLECTION_CURSOS);
const alunoCollection = db.collection(DB_COLLECTION_ALUNOS);
const matriculaCollection = db.collection(DB_COLLECTION_MATRICULAS);
const notasCollection = db.collection(DB_COLLECTION_NOTAS);

module.exports = {
    client,
    courseCollection,
    alunoCollection,
    matriculaCollection,
    notasCollection,
};
