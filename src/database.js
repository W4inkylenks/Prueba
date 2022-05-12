const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost/hems';


mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));