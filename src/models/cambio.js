const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cambioSchema = new Schema({
    tiempoTrans: { type: Number },
    distribuidor: [{ type: String, required: true}],
    tarifa:{type: Number,required: true}
});

var cambio = mongoose.model('cambio', cambioSchema, 'Cambio');

module.exports = cambio;
