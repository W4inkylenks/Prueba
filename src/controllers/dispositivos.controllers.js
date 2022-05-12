const dispositivosCtrl = {};


dispositivosCtrl.renderDisp = async ( req, res ) => {
    res.render('./dispositivos/dispositivo');
}


module.exports = dispositivosCtrl;