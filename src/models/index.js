const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const { Schema } = mongoose;

const CursoSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    turno: {
        type: String,
        enum: ['Matutino', 'Vespertino', 'Noturno'],
        default: 'Matutino',
        required: true,
    },
    maxVagas: {
        type: Number,
        required: true,
    },
    dispVagas: {
        type: Number,
        required: true,
    },
});

const AlunoSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    _id: {
        type: String,
        required: true,
        unique: true,
    },
});

const MatriculaSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        required: true,
    },
    turno: {
        type: String,
        enum: ['Matutino', 'Vespertino', 'Noturno'],
        required: true,
    },
});

const NotaSchema = new Schema({
    matriculaId: {
        type: String,
        required: true,
    },
    nota: {
        type: Number,
        required: true,
    },
});

const MatriculaModel = mongoose.model('MatriculaModel', MatriculaSchema);
const NotaModel = mongoose.model('NotaModel', NotaSchema);
const AlunoModel = mongoose.model('AlunoModel', AlunoSchema);
const CursoModel = mongoose.model('CursoModel', CursoSchema);

module.exports = { CursoModel, AlunoModel, MatriculaModel, NotaModel };
