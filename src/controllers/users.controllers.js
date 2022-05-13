const passport = require("passport");
const { validate } = require("rut.js");

const usersCtrl = {};
const User = require('../models/users');

usersCtrl.renderIndex = ( req, res ) => {
    res.render('./users/login');
};

function func(){
    return 'AJSFSO';
}

usersCtrl.renderSignUp = ( req, res ) => {
    let objeto = {
        nombre: 'ESTE ES UN OBJETO',
        apellido: "Hola"
    }
    console.log(objeto);
    res.render('users/signUp');
};

usersCtrl.singup = async (req, res) => {
    console.log( req.body );
    const error = [];
    let { nombre, rut, direccion, telefono, email, password, confirmPassword } = req.body;
    if (password != confirmPassword){
        error.push({ text: 'La contraseña no coincide'});
    }
    if ( password.length < 6){
        error.push( { text: 'La contraseña debe tener por lo menos 6 caracteres'});
    }
    if (!validate(rut)){
        error.push({ text: 'Rut incorrecto' })
    }
    if (error.length > 0){
        console.log(error);
        res.render('users/signup', {
            error,
            nombre,
            rut,
            direccion,
            telefono,
            email
        })
    }else {
        const rutUsuario = await User.findOne({ rut: rut});
        if (rutUsuario){
            req.flash('error_msg', 'El usuario ya se encuentra registrado');
            res.redirect('signup');
        }else {
            const rol = false;
            const nuevoUsuario = new User({nombre, rut, direccion, email, telefono, rol, password});
            
            nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
            await nuevoUsuario.save();
            req.flash('succes_msg', 'Usuario registrado con exito');
            res.redirect('/');
        }
    }

};

usersCtrl.singIn = passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/home',
    failureFlash: true
});

usersCtrl.logout = ( req, res ) => {
    req.logout();
    req.flash('success_msg', 'Desconectado con exito');
    res.redirect('/');
}

usersCtrl.renderEdit = async ( req, res ) => {
    const usuario = await User.find({'_id': req.user.id });

    res.render('./users/editUser.hbs', {usuario});

}

usersCtrl.editUser = async ( req, res ) => {
    const { nombre, direccion, email, telefono } = req.body;
    const usuario = req.user.id;
    await User.findByIdAndUpdate(usuario, {"nombre": nombre,"direccion": direccion, "email": email, "telefono": telefono});
    req.flash('success_msg', "Usuario actualizado");
    res.redirect('/home');
}



module.exports = usersCtrl;