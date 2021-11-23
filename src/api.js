const path = require('path');// es un modulo de node js , para trabar con rutas del directorio y archivos
const fs = require('fs');// es módulo proporciona una gran cantidad de funciones muy útiles para acceder e interactuar con el sistema de archivos.
const marked = require('marked'); // es modulo para encontrar links https
const fetch = require('node-fetch');

const getAbsolutePath = (file) => (path.isAbsolute(file) ? file : path.resolve(file));

const  isExit = (route) => fs.existsSync(route);

const isDirectory =(route) => fs.lstatSync(route).isDirectory(); 

const isFile =(route) => fs.lstatSync(route).isFile();

const isFileMd = (route) => path.extname(route) === '.md';

const readDirectory =(route) => fs.readdirSync(route);

const readFile = (route) => fs.readFileSync(route, 'utf8');

const getFilesMd = (route) => {
  let arrayOfFiles = [];
  if(isDirectory(route)) {// is a directory
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

const validateWithFetch = (link) => {
  return fetch(link.href)
  .then((data) => {
    if (data.status >= 200 && data.status < 400) {
      return {
        ...link,
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
};

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
