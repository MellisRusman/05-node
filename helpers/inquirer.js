const inquirer = require('inquirer');
require('colors');





const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.blue} Buscar ciudad`
            },
            {
                value: 2,
                name:`${'2.'.cyan} Historial`
            },
            {
                value: 0,
                name:`${'0.'.cyan} Salir`
            }
        ]
    }
];
const inquirerMenu = async() =>{
    console.clear();
    console.log("======================".cyan);
    console.log("===Elija una opcion===".cyan);
    console.log("======================\n".cyan);
    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async()=>{
const questions = [
    {
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.cyan} para continuar`,
    }
]
    console.log('\n')
    await inquirer.prompt(questions)

}

const leerInput = async(message) =>{
    const question = [
        {
            type: "input",
            name: 'description',
            message: message,
            validate(value){
                if (value.length === 0) {
                    return 'Ingrese otro valor'
                }
                return true;
            }
        }
    ]
    const {description} = await inquirer.prompt(question);
    return(description);
}
const mostrarLugares = async(lugares = []) =>{
    const choices = lugares.map ( (lugar, i) =>{
        const idx = `${i + 1}.`.cyan
        return {
            value: lugar.id,
            name: `${idx} ${lugar.name} `
        }
    })
    choices.unshift({
        value: '0',
        name: '0.'.cyan + 'Salir'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }]
    const {id} = await inquirer.prompt(preguntas);
    return id
}
const confimacion = async(message) =>{
    const preguntas = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }]
    const {ok} = await inquirer.prompt(preguntas);
    return ok
}
const completarTareas = async(tareas = []) =>{
    const choices = tareas.map ( (tarea, i) =>{
        const idx = `${i + 1}.`.cyan
        return {
            value: tarea.id,
            name: `${idx} ${tarea.description} `,
            checked: (tarea.finalizado) ? true : false
        }
    })
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }]
    const {ids} = await inquirer.prompt(pregunta);
    return ids
}
module.exports = {inquirerMenu,pausa, leerInput, mostrarLugares, confimacion,completarTareas};
































// const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// readline.question("Seleccione una opcion:", (opt) =>{
//     readline.close()
//     resolve(opt)
// })

    




