const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amr2Schema = new Schema({
    Fecha: { type: String, required: true },
    Hora: { type: String, requires: true },
    energiaSuministrada: { type: Number, required: true }
});

var AMR2 = mongoose.model('amr-2', amr2Schema, 'AMR2');

module.exports = AMR2;