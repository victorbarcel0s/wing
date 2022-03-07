const mongoose = require('mongoose')
const { Schema } = mongoose;



const CursoSchema = new Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String

        },
        shift: {
            type: String,
            enum: ['Matutino', 'Vespertino', 'Noturno'],
            default: 'Matutino'

        },
        maxVac: {
            type: String
        }
    }
)
const CursoModel = mongoose.model('CursoModel', CursoSchema)


const AlunoSchema = new Schema(
    {
        nome: {
            type: String
        },
        email: {
            type: String

        },

        _id: {
            type: String
        }
    }
)
const AlunoModel = mongoose.model('AlunoModel', AlunoSchema)

module.exports = { CursoModel, AlunoModel }