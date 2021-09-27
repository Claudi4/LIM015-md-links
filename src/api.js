
/*module.exports = () => {
    // ...
  };*/

  let prueba = process.argv.slice(2);
  console.log(prueba,7);

  const pruebaPath = {
    relativa: 'ib',
    absoluta: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib',
    fileAndMd: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md'
  }
  const path = require('path')
  const fs = require('fs');
  
  const isAbsolute = (file) => (path.isAbsolute(file) ? file : path.resolve(file));//if

  const  isExit = (route) => fs.existsSync(route);
  
  const isDirectory =(route) => fs.lstatSync(route).isDirectory(); 
  
  const isFile =(route) => fs.lstatSync(route).isFile(); 
  
  const isFileMd = (route) => path.extname(route) === '.md';
  
  const readDirectory =(route) => fs.readdirSync(route);

  console.log('convert absolute a relative y devuelve absolute:',isAbsolute(pruebaPath.relativa)); //true Ruta
  console.log('exit path:',isExit(pruebaPath.absoluta));//true
  console.log( 'is directory :',isDirectory(pruebaPath.absoluta)); //true
  console.log( 'is file:',isFile(pruebaPath.fileAndMd));//true
  console.log( 'the Flile is Md :',isFileMd(pruebaPath.fileAndMd)); //true
  console.log( 'read directory:',readDirectory(pruebaPath.absoluta));//true


//LEE ARCHIVOS MD
const arrayOfFiles = [];
const getFilesMd = (route) => {
  if(isDirectory(route)) {
    console.log(route, '---> Es una carpeta');
    const directoryOfArchives = readDirectory(route);
    console.log(directoryOfArchives,107);
    directoryOfArchives.forEach((elem) => {
      const routeElem = elem;
      const newRoute = path.join(route, routeElem);
      getFilesMd(newRoute);;
      
  })} else if(isFileMd(route)){
    arrayOfFiles.push(route);
  };
  return arrayOfFiles;
};
console.log('El archivo MD es ---> ', getFilesMd(pruebaPath.absoluta));


  module.exports = {
    prueba,
    isAbsolute,
    isExit,
  };