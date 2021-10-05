
/*module.exports = () => {
    // ...
  };*/

  //let prueba = process.argv.slice(2);
  //console.log(prueba,7);
  const path = require('path');
  const fs = require('fs');
  const marked = require('marked');
  const fetch = require('node-fetch');

  const getAbsolutePath = (file) => (path.isAbsolute(file) ? file : path.resolve(file));//if

  const  isExit = (route) => fs.existsSync(route);//no se esta usando por ahora hehehe
  
  const isDirectory =(route) => fs.lstatSync(route).isDirectory(); 
  
  const isFile =(route) => fs.lstatSync(route).isFile(); 
  
  const isFileMd = (route) => path.extname(route) === '.md';
  
  const readDirectory =(route) => fs.readdirSync(route);
   
  const readFile = (route) => fs.readFileSync(route, 'utf8');

  /*const pruebaPath = {
    relativa: 'ib',
    absoluta: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/',
    fileAndMd: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md'
  }
  const objetoPrueba =   {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    route: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md'
  },*/

 
  /*console.log('convert absolute a relative y devuelve absolute:',getAbsolutePath(pruebaPath.relativa)); //true Ruta
  console.log('exit path:',isExit(pruebaPath.absoluta));//true
  console.log( 'is directory :',isDirectory(pruebaPath.absoluta)); //true
  console.log( 'is file:',isFile(pruebaPath.fileAndMd));//true
  console.log( 'the Flile is Md :',isFileMd(pruebaPath.fileAndMd)); //true
  console.log( 'read directory:',readDirectory(pruebaPath.absoluta));//true
  console.log('read file:',readFile(pruebaPath.fileAndMd));//true*/


// Obtiene los archivos md(ruta) en un array 

const getFilesMd = (route) => {
  let arrayOfFiles = [];
  if(isDirectory(route)) {
    //console.log(route, '---> Es una carpeta');
    const directoryOfArchives = readDirectory(route);
    //console.log(directoryOfArchives,107);
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
 // console.log(files,72);
  const arrayMdLinks = [];
  //const arrayMd = getFilesMd(files);
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
  console.log(arrayMdLinks,89);
  return arrayMdLinks;
};
 //console.log(readlinkMd(pruebaPath.fileAndMd))

// validar la existencia de los links 
// fetch

const validateWithFetch = (link) => {
  //console.log(link,95);
  //const linksMd = readlinkMd(link);
  //console.log(linksMd,95);
  //const validateLinks = linksMd.map((link) => fetch(link.href)
  return fetch(link.href)
  .then((data) => {
    //console.log(data,97);
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
