const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sm02Schema = new Schema({
    Momento: {type: Date, required: true},
    Corriente: {type: Number, required: true},
    Voltaje: {type: Number, required: true},
    FP: {type: Number, required: true},
    PA: {type: Number, required: true},
    Consumo: {type: Number, required: true},
    tipo: {type: String, required: true}
})

var sm02 = mongoose.model('sm02', sm02Schema, 'SM02');

module.exports = sm02;
