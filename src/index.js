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
    authController.verifyJWT,
    courseController.getAllCourses,
);
api.get('/get/alunos', authController.verifyJWT, alunoController.getStudents);
api.get(
    '/get/matriculas',
    authController.verifyJWT,
    matriculaController.getMatriculas,
);
api.get('/get/notas', authController.verifyJWT, notasController.getNotas);

//POSTS
api.post('/post/curso', authController.verifyJWT, courseController.addCourse);
api.post(
    '/post/aluno',
    authController.verifyJWT,
    alunoController.registerStudent,
);
api.post(
    '/post/matricula',
    authController.verifyJWT,
    matriculaController.matricular,
);
api.post('/post/nota', authController.verifyJWT, notasController.postNota);

// UPDATES
api.put('/put/curso', authController.verifyJWT, courseController.updateCourse);
api.put('/put/aluno', authController.verifyJWT, alunoController.updateStudent);
api.put(
    '/put/matricula',
    authController.verifyJWT,
    matriculaController.updateMatricula,
);
api.put('/put/nota', authController.verifyJWT, notasController.updateNota);

// DELETES
api.delete(
    '/delete/curso',
    authController.verifyJWT,
    courseController.deleteCourse,
);
api.delete(
    '/delete/aluno',
    authController.verifyJWT,
    alunoController.deleteStudent,
);
api.delete(
    '/delete/nota',
    authController.verifyJWT,
    notasController.deleteNotas,
);
api.delete(
    '/delete/matricula',
    authController.verifyJWT,
    matriculaController.encerrarMatricula,
);

api.listen(port, () => console.log(`api listening on port ${port}`));
