const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { initialize } = require('passport');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const methodOverride = require("method-override");


// Initialization
const app = express();
require('./config/passport');

// settings

app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));

const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs',

    // Customs helpers
    helpers: {
        looking: function(value, vector){
            for (var valores in vector._id){
                if(value == valores) return vector.nombre;
            }
        }
    }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// Variables globales

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
})

//routes
var usersRoutes = require('./routes/users.routes');
var indexRoutes = require('./routes/index.routes');
var dispRoutes= require('./routes/dispositivos.routes');
var distribuRoutes = require('./routes/distribuidores.routes');
var ayudaRoutes = require('./routes/ayuda.routes');
var estadisticasRoutes = require('./routes/estadisticas.routes');

app.use(dispRoutes);
app.use(usersRoutes);
app.use(indexRoutes);
app.use(distribuRoutes);
app.use(ayudaRoutes);
app.use(estadisticasRoutes);

//static variables

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;