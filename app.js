require('dotenv').config()
require('colors')
const { pausa,inquirerMenu ,leerInput, mostrarLugares } = require("./helpers/inquirer.js");
const Busqueda = require('./models/busqueda.js');






const main = async()=>{
    let opt;
    const busqueda = new Busqueda()
    do {
        opt= await inquirerMenu()
        switch (opt) {
            case 1:
                //Peticion de introduccion de lugar

                const input = await leerInput('Ciudad: ')

                //Busqueda de lugares

                const lugares = await busqueda.ciudad(input)

                //Seleccionar lugar (Ciudad, Longitud, Latitud)

                const id = await mostrarLugares(lugares)
                const seleccionObj = lugares.find(l => l.id === id)

                if (id === '0') continue;

                busqueda.agregarHistorial(seleccionObj.name)

                //Clima (Temperatura, Minima, Maxima)

                const clima = await busqueda.climaLugar(seleccionObj.latitud, seleccionObj.longitud)

                //Mostrar los resultados obtenidos

                console.log('\nInformacion de la ciudad\n'.cyan)
                console.log('Ciudad: '.cyan, seleccionObj.name )
                console.log('Longitud: '.cyan, seleccionObj.longitud )
                console.log('Latitud: '.cyan, seleccionObj.latitud )
                console.log('Temperatura actual: '.cyan, clima.temp)
                console.log('Minima: '.cyan,clima.min )
                console.log('Maxima: '.cyan,clima.max)
                console.log('Descripcion del clima: '.cyan,clima.desc)
                break;
            case 2:
                busqueda.HistorialCapitalizado.forEach( (lugar, i) =>{
                    const idx = `${i + 1}.`.cyan
                    console.log(`${idx} ${lugar}`)
                })
                break;

        }
    if (opt !==0) await pausa()

    } while (opt !==0);

}

main();