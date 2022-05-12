const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sm01Schema = new Schema({
    Momento: {type: Date, required: true},
    Corriente: {type: Number, required: true},
    Voltaje: {type: Number, required: true},
    FP: {type: Number, required: true},
    PA: {type: Number, required: true},
    Consumo: {type: Number, required: true},
    tipo: {type: String, required: true}
})

var sm01 = mongoose.model('sm01', sm01Schema, 'SM01');

module.exports = sm01;
