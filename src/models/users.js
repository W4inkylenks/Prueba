const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
    nombre: { type: String, required: true },
    rut: {type: String, required: true, unique: true },
    direccion: {type: String, required: true},
    email: { type: String, required: true },
    telefono: { type: Number, required: true },
    rol: { type: Boolean, required: true },
    password: { type: String, required: true },
    tarifaUsada: { type: Number },
}, { timestamps: true});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);




