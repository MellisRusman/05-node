const fs = require('fs')
const axios = require('axios')

class Busqueda {
    historial = []
    dbpath = './db/dbclima.json'


    constructor() {
        this.leerDB()
    }
    get paramsMapBox(){
        return {
            'access_token' : process.env.MAPBOX_KEY,
            'limit' : '5',
            'language' : 'es'
        }
    }
    get paramsWeather(){
        return{
            appid : process.env.OPENWEATHER_KEY,
            units : 'metric',
            lang : 'es'
        }
    }
    get HistorialCapitalizado(){
        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ')
            palabras = palabras.map(p => p[0].toUpperCase(1) + p.substring(1))

            return palabras.join(' ')
        })
    }
    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const respuesta = await instance.get()


            return respuesta.data.features.map(lugar => ({
                id : lugar.id,
                name : lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]
            }))
        } catch (error) {
            return []
        }
    }

    async climaLugar (lat, lon){
        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            })
            const resp = await instance.get()
            const {weather, main} = resp.data

            return {
                desc: weather[0].description,
                temp : main.temp,
                min : main.temp_min,
                max : main.temp_max
            }

        } catch (error) {
            console.log(error)
        }
    }
    agregarHistorial(lugar = ''){
        if (this.historial.includes(lugar.toLocaleLowerCase())){
            return
        }

        this.historial = this.historial.splice(0,5)

        this.historial.unshift(lugar.toLocaleLowerCase())

        this.guardarDB()
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbpath, JSON.stringify(payload))
    }
    leerDB(){

        if(!fs.existsSync(this.dbpath)) return

        const info = fs.readFileSync(this.dbpath, {encoding: 'utf-8'})

        const data = JSON.parse(info)

        this.historial = data.historial

    }
}
module.exports = Busqueda;