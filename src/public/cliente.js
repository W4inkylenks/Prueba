const socket = io.connect("http://localhost:4000");

function Consumo(data) {
  var total = 0;

  if (data.length == 0) {
    return 0;
  } else {
    data.forEach((element) => {
      total = total + element.Consumo;
    });
    return total;
  }
}

function clasificador(data) {
  var lista = [];
  var tipo = data[0].Tipo;
  var voltaje = 0;
  var corriente = 0;
  var consumo = 0;
  var cantidad = 0;
  data.forEach((element) => {
    console.log(element)
    if (tipo == element.Tipo){
      voltaje = voltaje + element.Voltaje;
      corriente = corriente + element.Corriente;
      consumo = consumo + element.Consumo;
      cantidad = cantidad + 1;
    } 
    else {
      var tCorriente = corriente / cantidad;
      var tVoltaje = voltaje / cantidad;
      var tConsumo = consumo / cantidad;
      var datos = { t: tipo, cor: tCorriente, vol: tVoltaje, con: tConsumo};
      lista.push(datos);
      tipo = element.Tipo;
      voltaje = 0;
      corriente = 0;
      consumo = 0;
      cantidad = 0;
    }
  });
    var tCorriente = corriente / cantidad;
    var tVoltaje = voltaje / cantidad;
    var tConsumo = consumo / cantidad;
    var datos = { t: tipo, cor: tCorriente, vol: tVoltaje, con: tConsumo};
    lista.push(datos);

    return lista;
}

function render(data1, data2, data3, A1, A2, tarifa) {
  var consumoTotal = Consumo(data1) + Consumo(data2) + Consumo(data3);
  console.log(consumoTotal);
  var solar = A1[0].energiaSuministrada;
  var eolica = A2[0].energiaSuministrada;

  if (consumoTotal == 0) {
    var distri = [];
    var pago = 0;
    var html = `<thead>
        <tr>
            <th>Distribuidor</th>
            <th>Renovable</th>
            <th>Seleccion</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <th >Solar</th>
            <td >SI</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Eolico</th>
            <td>SI</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Normal</th>
            <td>NO</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>
        </tr>
    </tbody>`;
    consumo_normal = consumoTotal;
  } else if (consumoTotal < solar) {
    var distri = ["solar"];
    var pago = 0;
    var html = `<thead>
        <tr>
            <th>Distribuidor</th>
            <th>Renovable</th>
            <th>Seleccion</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <th >Solar</th>
            <td >SI</td>
            <td><img src="imagenes/check.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Eolico</th>
            <td>SI</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Normal</th>
            <td>NO</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>
        </tr>
    </tbody>`;
    consumo_normal = consumoTotal
  } else if (consumoTotal < eolica) {
    var distri = ["eolico"];
    var pago = 0;
    var html = `<thead>
        <tr>
            <th>Distribuidor</th>
            <th>Renovable</th>
            <th>Seleccion</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <th >Solar</th>
            <td >SI</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Eolico</th>
            <td>SI</td>
            <td><img src="imagenes/check.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Normal</th>
            <td>NO</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>
        </tr>
    </tbody>`;
    consumo_normal = consumoTotal;
  } else if (consumoTotal < solar + eolica) {
    var distri = ["solar", "eolico"];
    var pago = 0;
    var html = `<thead>
        <tr>
            <th>Distribuidor</th>
            <th>Renovable</th>
            <th>Seleccion</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <th >Solar</th>
            <td >SI</td>
            <td><img src="imagenes/check.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Eolico</th>
            <td>SI</td>
            <td><img src="imagenes/check.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Normal</th>
            <td>NO</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>
        </tr>
    </tbody>`;
    consumo_normal = consumoTotal;
  } else{
    var distri = ["normal"];
    var pago = tarifa[0].Precio;
    var consumo_normal = consumoTotal;
    var html = `<thead>
        <tr>
            <th>Distribuidor</th>
            <th>Renovable</th>
            <th>Seleccion</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <th >Solar</th>
            <td >SI</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Eolico</th>
            <td>SI</td>
            <td><img src="imagenes/remove.png" width="35px" height="35px"></td>

        </tr>
        <tr>
            <th>Normal</th>
            <td>NO</td>
            <td><img src="imagenes/check.png" width="35px" height="35px"></td>
        </tr>
    </tbody>`;
    consumo_normal = consumoTotal - solar - eolica;
  }

  if (html) {
    document.getElementById("tabla").innerHTML = html;
    document.getElementById("consumo").innerHTML = `Consumo: ${consumoTotal}`;
  }
  socket.emit("guardar", {
    distribuidores: distri,
    monto: pago,
    consumo_normal: consumo_normal,
  });
  console.log(consumo_normal);
}

function renderDisp(datos1, datos2, datos3){
  var asm1 = clasificador(datos1);
  var asm2 = clasificador(datos2);
  var asm3 = clasificador(datos3);
  var lista = [];
  var html = ''
  asm1.forEach((element) => {
    lista.push(element)
  })
  
  asm2.forEach((element) => {
    lista.push(element)
  })
  
  asm3.forEach((element) => {
    lista.push(element)
  })

  lista.forEach((element) => {
    var cont = 1;
    var img = element.t + '.png';
    console.log(element.con)
    html = html + `<div class="card bg-secondary mb-3" id="asm` + cont + `style="max-width: 65%;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="imagenes/` + img +`" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h4 class="card-title">Datos</h4>
          <p class="card-text">Corriente: ` + element.cor + `</p> 
          <p class="card-text">Voltaje: ` + element.vol + `</p>
          <p class="card-text">Consumo: ` + element.con + `</p>
          <p class="card-text">Tipo: ` + element.t + `</p>
        </div>
      </div>
    </div>
  </div> <br>`
  cont = cont + 1
  })
  document.getElementById("caja").innerHTML = html
}

if(jQuery(location).attr("href") == "http://localhost:4000/dispositivos"){
  socket.emit("envio", { validacion: true });
  socket.on("data", (data) => {
    renderDisp(
      data.datos1, 
      data.datos2, 
      data.datos3
    );
  });
}

if (jQuery(location).attr("href") == "http://localhost:4000/distribuidores") {
  socket.emit("envio", { validacion: true });
  socket.on("data", (data) => {
    render(
      data.datos1,
      data.datos2,
      data.datos3,
      data.A1,
      data.A2,
      data.tarifa
    );
  });
}

if (jQuery(location).attr("href") == "http://localhost:4000/estadisticas") {
  // envio de datos

  socket.emit("envio", { validation: true});
  socket.on("data", (data) => {
    var uno = data.datos1;
    var dos = data.datos2;
    var tres = data.datos3;
    let arr = [];
    arr = [10,9,15];

    console.log(uno);
    var ctx = document.getElementById("grafica").getContext("2d");
    var myChart = new Chart(ctx,{
      type: "pie",
      data:{
        labels: ['col1', 'col2', 'col3'],
        datasets: [{
          label: 'Num datos',
          data: arr,
          backgroundColor:[
            'rgb(66,134,244)',
            'rgb(74,135,244)',
            'rgb(229,89,50)'
          ]
        }]
      },
      options:{
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero: true
            }
          }]
        }
      }
    })
  })
}
