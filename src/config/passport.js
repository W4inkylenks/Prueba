const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = require('../models/users');

passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await users.findOne({email});
    if (!user) {
        return done(null, false, { message: 'No se ha encontrado al usuario'})
    }else {
        const match = await user.matchPassword(password);
        if ( match ) {
            return done(null, user);
        }else {
            return(done(null, false, { message: 'Contraseña incorrecta' }))
        }
    }
}));

passport.serializeUser( (user, done) => {
    done(null, user.id)
});

passport.deserializeUser( (id, done) => {
    users.findById(id, (err,user) => {
        done(err, user)
    });
});

module.exports = passport;
