const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tarifaSchema = new Schema({
    Hora: { type: String, required: true },
    Precio: { type: Number, required: true },
});

var tarifa = mongoose.model('tarifa', tarifaSchema, 'tarifa');

module.exports = tarifa;