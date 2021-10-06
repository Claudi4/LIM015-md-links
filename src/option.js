//opciones de enlaces 

const arrayEnlaces = [
    {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        route: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\fileOne.md',
        status: 200,
        ok: 'ok'
    },
    {
        href: 'https://www.google.com/',
        text: 'Otra cosa',
        ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
        status: 200,
        menssage: 'OK'
    },
    {
        href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
        text: 'Píldora recursión - YouTube Laboratoria Developers',
        route: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\library\\libraryTree\\fileTreeOne.md',
        status: 404,
        ok: 'fail'
    },
    {
        href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
        text: 'Píldora recursión - YouTube Laboratoria Developers',
        route: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\library\\libraryTree\\fileTreeOne.md',
        status: 200,
        ok: 'ok'
    },
];

// Función cantidad de links unicos
const uniqueLinks = (obj) => {
    const unique = new Set(obj.map(elem => elem.href)); // array
    const uniqueLinks = `\nUnique: ${unique.size}`;
    return uniqueLinks;
};
//console.log(uniqueLinks(arrayEnlaces));

// * Función cantidad de links rotos
const brokenLink = (obj) => {
    const broken = obj.filter((elem) => elem.status >= 400) // array de objetos
    const brokenLink = `\nBroken: ${broken.length}`;
    return brokenLink;
};
//console.log(brokenLink(arrayEnlaces));

// Función cantidad de links totales
const totalLink = (obj) => {
    const total = obj.map(link => link.href); // array de enlaces
    const totalLink = `\nTotal: ${total.length}`;
    return totalLink;
};
//console.log(totalLink(arrayEnlaces));
module.exports = {
    uniqueLinks,
    brokenLink,
    totalLink
};