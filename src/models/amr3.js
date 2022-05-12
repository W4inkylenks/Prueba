const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amr3Schema = new Schema({
    Fecha: { type: Date, required: true },
    energiaSuministrada: { type: Number, required: true }
});

var AMR3 = mongoose.model('amr-3', amr3Schema, 'AMR3');

module.exports = AMR3;