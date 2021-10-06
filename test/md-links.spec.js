const mdLinks = require('../src/api.js');
const option = require('../src/option.js');

const pruebaPath = {
  relativa: 'ib',
  absoluta: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib',
  fileAndMd: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md'
}

describe('API', () => {

  //retornara si la ruta es absoluta
  it('Returns to function', () => {
    expect(typeof mdLinks.getAbsolutePath).toBe('function');
  });
  it('Returns to the path is absolute ', () => {
  expect(mdLinks.getAbsolutePath(pruebaPath.relativa)).toBe('C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\ib');
  });
  it('Returns to the path is absolute ', () => {
    expect(mdLinks.getAbsolutePath(pruebaPath.absoluta)).toBe('C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib');
  });
  //retornara si al ruta existe 
  it('Returns to function', () => {
    expect(typeof mdLinks.isExit).toBe('function');
  });
  it('Returns true is the path exists', () => {
    expect(mdLinks.isExit(pruebaPath.absoluta)).toBe(true);
  });
  //retornara true si la carpeta existe 
  it('Returns to function', () => {
    expect(typeof mdLinks.isDirectory).toBe('function');
  });
  it('Returns true is the directory exists', () => {
    expect(mdLinks.isDirectory(pruebaPath.absoluta)).toBe(true);
  });
  //retornara true si archivo existe
  it('Returns to function', () => {
    expect(typeof mdLinks.isFile).toBe('function');
  });
  it('Returns true is the file exists', () => {
    expect(mdLinks.isFile(pruebaPath.fileAndMd)).toBe(true);
  });
  //retornara true si el archivo es MD
  it('Returns to function', () => {
    expect(typeof mdLinks.isFileMd).toBe('function');
  });
  it('Returns true is the file is MD', () => {
    expect(mdLinks.isFileMd(pruebaPath.fileAndMd)).toBe(true);
  });
  //leera el contenido de la carpeta y retornara un array
  it('Returns to function', () => {
    expect(typeof mdLinks.readDirectory).toBe('function');
  });
  it('Read to content of directory and returnd arrays', () => {
    expect(typeof mdLinks.readDirectory(pruebaPath.absoluta)).toBe('object');
  });
  //leera el contenido del archivo y retornara un array
  it('Returns to function', () => {
    expect(typeof mdLinks.readFile).toBe('function');
  });
  it('Read to content of File and returnd string', () => {
    expect(typeof mdLinks.readFile(pruebaPath.fileAndMd)).toBe('string');
  });
  //FUNCION LEE ARCHIVOS MD
  it('Returns to function', () => {
    expect(typeof mdLinks.getFilesMd).toBe('function');
  });
  it('Find files MD and returnd to array', () => {
    expect(typeof mdLinks.getFilesMd(pruebaPath.absoluta)).toBe('object');
  });
//FUNCION LEE FILE MD
it('Returns to function', () => {
  expect(typeof mdLinks.readlinkMd).toBe('function');
});
it('Read  files MD and return an array of object', () => {
  expect(typeof mdLinks.readlinkMd( mdLinks.getFilesMd(pruebaPath.fileAndMd))).toBe('object');
});


//FUNCION VALIDAR CON FETCH 

it('Returns to function', () => {
  expect(typeof mdLinks.validateWithFetch).toBe('function');
});
it('Debería validar los links OK extraidos', () => {
  //Se crea una variable returnLinks con la cual se comparara la ruta de prueba, para comparar con lo que devuelva.
    const returnLinks = {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      route: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md',
      status: 200,
      ok: 'ok'
    };
    const objetoPrueba =   {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      route: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md'
    };
    return mdLinks.validateWithFetch(objetoPrueba).then((res) => {
      //console.log(res,103);
      //console.log(returnLinks,104);
      expect(res).toEqual(returnLinks)});
});
it('Debería validar los links fail extraidos', () => {
  //Se crea una variable returnLinks con la cual se comparara la ruta de prueba, para comparar con lo que devuelva.
    const returnLinksFail = {
        href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
        text: 'Píldora recursión - YouTube Laboratoria Developers',
        route: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\library\\libraryTree\\file noexiste.md',
        status: 404,
        ok: 'fail'
      };
      const returnObjFail = {
        href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
        text: 'Píldora recursión - YouTube Laboratoria Developers',
        route: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib\\library\\libraryTree\\file noexiste.md',
      };
    return mdLinks.validateWithFetch(returnObjFail).then((res) => {
      // console.log(res);
      // console.log(returnLinks);
      expect(res).toEqual(returnLinksFail)});
});


//ejemplo 
const arrayEnlaces = [
  {
    href: 'https://www.google.com/',
    text: 'Adios',
    ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
    status: 200,
    menssage: 'OK'
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
    text: 'Adios',
    ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
    status: 404,
    menssage: 'FAIL'
  },
  {
    href: 'https://www.instagram.com/',
    text: 'Adios',
    ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
    status: 200,
    menssage: 'OK'
  },
];

//FUNCION VALIDAR liks unicos 
it('Retorna function para la funcion enlacesUnicos', () => {
  expect(typeof option.uniqueLinks).toBe('function');
});
it('Lee los link unicos y devuelve un string con la cantidad', () => {
  expect(typeof option.uniqueLinks(arrayEnlaces)).toBe('string');
});

// funcion links rotos
it('Retorna function para la funcion enlacesRotos', () => {
  expect(typeof option.brokenLink).toBe('function');
});
it('Lee los link rotos y devuelve un string con la cantidad', () => {
  expect(typeof option.brokenLink(arrayEnlaces)).toBe('string');
});

// funcion links totales
it('Retorna function para la funcion totalEnlaces', () => {
  expect(typeof option.totalLink).toBe('function');
});
it('Lee el total de los link y devuelve un string con la cantidad', () => {
  expect(typeof option.totalLink(arrayEnlaces)).toBe('string');
});

});