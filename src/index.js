require("dotenv").config();
const express = require('express')
const courseController = require('./controllers/courseController');
const alunoController = require('./controllers/alunoController')
const matriculaController = require('./controllers/matriculaController')
const notasController = require('./controllers/notasController')

const api = express()
const port = 7070
api.use(express.json())
api.get('/', (req, res) => res.send('Hello World!'))
//GETS
api.get('/get/courses', courseController.getAllCourses)
api.get('/get/alunos', alunoController.getStudents)
api.get('/get/matriculas', matriculaController.getMatriculas)
api.get('/get/notas', notasController.getNotas)


//POSTS
api.post('/post/course', courseController.addCourse)
api.post('/post/aluno', alunoController.registerStudent)
api.post('/post/matricula', matriculaController.matricular)
api.post('/post/nota', notasController.postNota)


api.listen(port, () => console.log(`api listening on port ${port}`))