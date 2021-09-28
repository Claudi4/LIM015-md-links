const mdLinks = require('../src/api.js');

const pruebaPath = {
  relativa: 'ib',
  absoluta: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib',
  fileAndMd: 'C:/Users/Laboratoria/Documents/GitHub/LIM015-md-links/lib/fileOne.md'
}

describe('API', () => {

  //retornara si la ruta es absoluta
  it('Returns to function', () => {
    expect(typeof mdLinks.isAbsolute).toBe('function');
  });
  it('Returns to the path is absolute ', () => {
  expect(mdLinks.isAbsolute(pruebaPath.relativa)).toBe('C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\ib');
  });
  it('Returns to the path is absolute ', () => {
    expect(mdLinks.isAbsolute(pruebaPath.absoluta)).toBe('C:\\Users\\Laboratoria\\Documents\\GitHub\\LIM015-md-links\\lib');
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
  it('Read  files MD and returnd to array and object', () => {
    expect(typeof mdLinks.readlinkMd(pruebaPath.fileAndMd)).toBe('object');
  });

});

