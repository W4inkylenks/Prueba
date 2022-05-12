const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sm03Schema = new Schema({
    Momento: {type: Date, required: true},
    Corriente: {type: Number, required: true},
    Voltaje: {type: Number, required: true},
    FP: {type: Number, required: true},
    PA: {type: Number, required: true},
    Consumo: {type: Number, required: true},
    tipo: {type: String, required: true}
})

var sm03 = mongoose.model('sm03', sm03Schema, 'SM03');

module.exports = sm03;
