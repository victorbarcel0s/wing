const { ObjectId } = require('mongodb');
const db = require('../../database');
const models = require('../../models');

async function postNota(req, res) {
    const nota = new models.NotaModel(req.body);
    try {
        await db.client.connect();
        await db.notasCollection.insertOne(nota);
        res.status(200).json('Nota cadastrada com sucesso');
    } catch (error) {
        res.status(401).json(error.message);
    }
}
async function getNotas(req, res) {
    try {
        await db.client.connect();
        const response = await db.notasCollection.find().toArray();
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json(error.message);
    }
}
async function deleteNotas(req, res) {
    try {
        const _id = req.body._id;
        await db.client.connect();
        await db.notasCollection.deleteOne({
            _id: ObjectId(_id),
        });
        res.status(200).json('Deletado com sucesso');
    } catch (error) {
        res.status(400).json('Error');
    }
}
async function updateNota(req, res) {
    try {
        const infoToUpdate = new models.NotaModel(req.body);
        await db.client.connect();
        const response = await db.notasCollection.updateOne(
            { _id: ObjectId(infoToUpdate._id) },
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
    postNota,
    getNotas,
    updateNota,
    deleteNotas,
};
