const app = require('./app');
require('./database')

const http = require('http').Server(app);

const io = require('socket.io')(http)

const sm01 = require('./models/sm-01');
const sm02 = require('./models/sm-02');
const sm03 = require('./models/sm-03');
const AMR1 = require('./models/amr1');
const AMR2 = require('./models/amr2');
const AMR3 = require('./models/amr3');
const cambio = require('./models/cambio');
const tarifa = require('./models/tarifa');

http.listen(app.get('port'), () => {
    console.log('Server on Port ', app.get('port'));
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.on('envio', (socket) => {
        
        if (socket.validacion) {
            setInterval(async function () {
                /*
                var f = new Date()
                var dia = f.getUTCDate();
                var mes = f.getMonth() + 1;
                var anio = f.getFullYear();
                var hora = f.getHours();
                if (hora < 9) {
                    var hoy = anio + '-0' + mes + '-' + dia + 'T0' + hora + ':00:00.000z'
                    var hora2 = hora + 1
                    var hoy2 = anio + '-0' + mes + '-' + dia + 'T0' + hora2 + ':00:00.000z'
                }else if(hora == 9) {
                    var hoy = anio + '-0' + mes + '-' + dia + 'T0' + hora + ':00:00.000z'
                    var hoy2 = anio + '-0' + mes + '-' + dia + 'T'+ hora +':00:00.000z'
                }else{
                    var hoy = anio + '-0' + mes + '-' + dia + 'T'+ hora +':00:00.000z'
                    var hoy2 = anio + '-0' + mes + '-' + dia + 'T'+ hora +':00:00.000z'
                }
                */
                var hoy = new Date('2021-07-14T14:00:00.000z')
                var hoy2 = new Date('2021-07-14T15:00:00.000z')
                var hoy3 = new Date('2021-07-14T01:00:00.000z')
                var tar = hoy.getHours();
                if(tar < 9){
                    var tari = '0'+ tar + ':00'
                }else{
                    var tari = tar + ':00'
                }
                const A1 = await AMR1.find();
                const A2 = await AMR2.find();
                const datos1 = await sm01.find({
                    Momento: {
                        $gte: hoy,
                        $lt: hoy2
                    }    
                });
                const datos2 = await sm02.find({
                    Momento: {
                        $gte: hoy,
                        $lt: hoy2
                    }    
                });
                const datos3 = await sm03.find({
                    Momento: {
                        $gte: hoy,
                        $lt: hoy2
                    }    
                });
                const tarifaAct = await tarifa.find({Hora: tari})

                io.emit('data', { datos1: datos1, datos2: datos2, datos3: datos3, A1: A1, A2: A2, tarifa: tarifaAct});
            }, 5000)
        }
    })
    socket.on('guardar', async (socket) => {
        var hoy = new Date();
        const nuevo_cambio = new cambio({tiempoTranscurrido: 60, distribuidor: socket.distribuidores, tarifa: socket.monto })
        const nuevo_amr3 = new AMR3({Fecha: hoy, energiaSuministrada: socket.consumo_normal});
        console.log(socket.consumo_normal)
        await nuevo_cambio.save();
        await nuevo_amr3.save();
    })
})



