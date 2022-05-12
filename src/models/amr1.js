const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amr1Schema = new Schema({
    Fecha: { type: String, required: true },
    Hora: { type: String, requires: true },
    energiaSuministrada: { type: Number, required: true }
});

var AMR1 = mongoose.model('amr-1', amr1Schema, 'AMR1');

module.exports = AMR1;