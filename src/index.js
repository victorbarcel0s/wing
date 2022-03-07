require("dotenv").config();
const express = require('express')
const courseController = require('./controllers/courseController');
const alunoController = require('./controllers/alunoController')
const api = express()
const port = 7070
api.use(express.json())
api.get('/', (req, res) => res.send('Hello World!'))
api.get('/get/courses', courseController.getAllCourses)
api.get('/get/alunos', alunoController.getStudents)
api.post('/post/course', courseController.addCourse)
api.post('/post/aluno', alunoController.registerStudent)

api.listen(port, () => console.log(`api listening on port ${port}`))