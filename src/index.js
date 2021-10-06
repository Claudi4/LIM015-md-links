const api = require('../src/api.js');

const rutaValida = 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib';
const rutaNoValida = 'D:/LABORATORIA2021/LIM015-md-links/exam';
const noHayArchivosMd = 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\library\\librarynotfound';
const archivoMdSinLinks = 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\library\\libraryTree\\file text.md';


const mdlinks = (pathh, option) => new Promise((resolve, reject) => {
    const pathValidate = api.getAbsolutePath(pathh);
    if (api.isExit(pathValidate)) {
        const searchPath = api.getFilesMd(pathValidate); // retorna array de .md
        //console.log(searchPath,13);
        const getLinks = api.readlinkMd(searchPath); // retorna el array de objeto de links con 03 propiedades
        //console.log(getLinks,13);
        //console.log(searchPath,14);
        if (getLinks.length === 0) {
            reject('error')
        } else {
            if (option.validate === true) {
                const validLinks = getLinks.map(link => api.validateWithFetch(link));
                resolve(Promise.all(validLinks));
            } else {
                resolve(getLinks);
            }
        }
    } else {
        reject('noExist');
    }
});

mdlinks(rutaValida, { validate: true })
    .then(res => {
        console.log(res);
        return res;
        
    })
    .catch(error => {
        console.log('ERROR: ' + error);
    })

module.exports = {
    mdlinks,
}