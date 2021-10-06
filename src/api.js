const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
  
//funciones independientes 
const getAbsolutePath = (file) => (path.isAbsolute(file) ? file : path.resolve(file));//if
//console.log('convert absolute a relative y devuelve absolute:',getAbsolutePath(pruebaPath.relativa)); //true Ruta

const  isExit = (route) => fs.existsSync(route);//no se esta usando por ahora hehehe
//console.log('exit path:',isExit(pruebaPath.absoluta));//true

const isDirectory =(route) => fs.lstatSync(route).isDirectory(); 
//console.log( 'is directory :',isDirectory(pruebaPath.absoluta)); //true

const isFile =(route) => fs.lstatSync(route).isFile();
//console.log( 'is file:',isFile(pruebaPath.fileAndMd));//true 

const isFileMd = (route) => path.extname(route) === '.md';
//console.log( 'the Flile is Md :',isFileMd(pruebaPath.fileAndMd)); //true

const readDirectory =(route) => fs.readdirSync(route);
//console.log( 'read directory:',readDirectory(pruebaPath.absoluta));//true

const readFile = (route) => fs.readFileSync(route, 'utf8');
//console.log('read file:',readFile(pruebaPath.fileAndMd));//true*/

//pruebas para las funcionalidades de las funciones
/*const pruebaPath = {
  relativa: 'ib',
  absoluta: 'C:/Users/boratoria/Documents/GitHub/LIM015-md-links/lib/',
  fileAndMd: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md'
};
const objetoPrueba =   {
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  route: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md'
};*/

// Obtiene los archivos md(ruta) en un array 

const getFilesMd = (route) => {
  let arrayOfFiles = [];
  if(isDirectory(route)) {//---> Es una carpeta');
    const directoryOfArchives = readDirectory(route);
    directoryOfArchives.forEach((elem) => {
      const routeElem = elem;
      const newRoute = path.join(route, routeElem);
      const newArraysfilsMd = getFilesMd(newRoute);
      arrayOfFiles = arrayOfFiles.concat(newArraysfilsMd);
  })} else if(isFileMd(route)){  
    arrayOfFiles.push(route);
  };
  return arrayOfFiles;
};
//console.log('El archivo MD es ---> ', getFilesMd(pruebaPath.absoluta));


// leer los links de los archivos md dentro de un array de obj

const readlinkMd = (files) => {
  const arrayMdLinks = [];
  files.forEach((route) => {
      const readfilesMd = readFile(route);
      const renderer = new marked.Renderer();
      renderer.link = (url, texto, urlText) => {
        arrayMdLinks.push(
            {
                href: url,
                text: urlText.substring(0, 50),
                route: route
              }
          );
      };
      marked(readfilesMd, { renderer});
  });
  return arrayMdLinks;
};
 //console.log(readlinkMd(pruebaPath.fileAndMd),91)

// validar la existencia de los links 
// fetch
const validateWithFetch = (link) => {
  return fetch(link.href)
  .then((data) => {
    if (data.status >= 200 && data.status < 400) {
      return {
        ...link,//link
        status: data.status,
        ok: 'ok'
      };
    }
    return {
      ...link,
        status: data.status,
        ok: 'fail'
    };
  })
  .catch((err) => ({
    ...link,
    status: err.response.status,
    menssage: 'fail'
  }))
  //return Promise.all(validateLinks);
 // return (validateLinks);
};
//validateWithFetch(objetoPrueba).then(response => (console.log(response)));

  module.exports = {
    getAbsolutePath,
    isExit,
    isDirectory,
    isFile,
    isFileMd,
    readDirectory,
    readFile,
    getFilesMd,
    readlinkMd,
    validateWithFetch
  };
