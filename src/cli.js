const index = require('../src/index.js');
const option = require('../src/option.js');
const chalk = require('chalk');

//ejemplo de rutas 
const rutaValida = 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib';
const rutaNoValida = 'D:/LABORATORIA2021/LIM015-md-links/exam';
const noHayArchivosMd = 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\library\\librarynotfound';
const archivoMdSinLinks = 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\library\\libraryTree\\file text.md';

//Para la funcion de CLI Retorna un array con los argvs pasados en la linea de comandos,
//-Primero sera el ejecutable node -> md-links en la posicion [0]
//-Segundo sera la ruta del ejecutable -> 'D:/LABORATORIA2021/LIM015-md-links/example' en la posicion[1]
//-Tercero sera los argumentos que el usuario le pase a mi funcion -> --stats o --validate en la posicion [2]

const argmt = process.argv.slice(2) //contiene la ruta llamada en el siguiente orden  ['node', 'md-links', 'd:/ruta']

const cli = (argmt) => {

    if (argmt.length === 1) { // true - tamaño del array 1 ingresado => 'd:/ruta'
        index.mdlinks(argmt[0], { validate: false }) //entrara => mdlinks contiene dos parametros ( ruta,options)// D:/LABORATORIA2021/LIM015-md-links/example 
            .then(resolve => {
                resolve.map((objeto) => {
                    console.log(`${chalk.yellow(objeto.href)} | ${chalk.cyan(objeto.text)} | ${chalk.green(objeto.route)}`); // concatena y me devolvera un string
                })
            })
            .catch(reject => console.log(reject));
    }
    if (argmt.length === 2) { //aqui sera  true - tamaño array 2 ingresado =>  'd:/ruta' '--validate'
        switch (argmt[1]) { // --validate
            case '--validate':
                index.mdlinks(argmt[0], { validate: true })
                    .then(resolve => {
                        resolve.map((objeto) => {
                            console.log(`${chalk.green(objeto.route)} | ${chalk.yellow(objeto.href)} | ${chalk.blue(objeto.ok)} | ${chalk.magenta(objeto.status)} | ${chalk.cyan(objeto.text)}`);
                        })
                    })
                    .catch(reject => console.log(reject));
                break;

            case '--stats':
                index.mdlinks(argmt[0], { validate: true })
                    .then(resolve =>
                        console.log(`${chalk.cyan(option.totalLink(resolve))} ${chalk.magenta(option.uniqueLinks(resolve))}`)
                    )
                    .catch(reject => console.log(reject));
                break;

            case '--help':
                console.log(`Intente escribir después de la ruta: --stats, --validate o ambos`);
                break;

            default: console.log('Comando no válido. Si necesita ayuda ingrese --help');
                break;
        }
    }
    if (argmt.length === 3) { //aqui sera tamaño array 3 ingresado =>  'd:/ruta' '--validate' --starts
        if (
            (argmt[1] === "--stats" && argmt[2] === "--validate") ||
            (argmt[1] === "--validate" && argmt[2] === "--stats")
        ) {
            index.mdlinks(argmt[0], { validate: true })
                .then(resolve => console.log(`${chalk.cyan(option.totalLink(resolve))} \n ${chalk.magenta(option.uniqueLinks(resolve))} \n ${chalk.yellow(option.brokenLink(resolve))}`))
                .catch(reject => console.log(reject));
        } else {
            console.log('Comando no válido. Necesita ayuda ingrese --help.');
        }
    }
};
    
cli(argmt);
module.exports = {
    cli,
}