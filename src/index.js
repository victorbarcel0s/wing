require('dotenv').config();
const express = require('express');
const courseController = require('./controllers/courseController');
const alunoController = require('./controllers/alunoController');
const matriculaController = require('./controllers/matriculaController');
const notasController = require('./controllers/notasController');
const authController = require('./controllers/authController');

const api = express();
const port = 7070;
api.use(express.json());
api.get('/', (req, res) => res.send('Hello World!'));

// AUTH
api.get('/get/token', authController.generateJWT);

//GETS
api.get(
    '/get/courses',
    // authController.verifyJWT,
    courseController.getAllCourses,
);
api.get('/get/alunos', alunoController.getStudents);
api.get('/get/matriculas', matriculaController.getMatriculas);
api.get('/get/notas', notasController.getNotas);

//POSTS
api.post('/post/course', courseController.addCourse);
api.post('/post/aluno', alunoController.registerStudent);
api.post('/post/matricula', matriculaController.matricular);
api.post('/post/nota', notasController.postNota);

// UPDATES
api.put('/put/course', courseController.updateCourse);

// DELETES
api.delete('/delete/course', courseController.deleteCourse);
api.delete('/delete/aluno', alunoController.deleteStudent);
api.delete('/delete/matricula', matriculaController.encerrarMatricula);

api.listen(port, () => console.log(`api listening on port ${port}`));
