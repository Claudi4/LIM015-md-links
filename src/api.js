
/*module.exports = () => {
    // ...
  };*/
  let prueba = process.argv.slice(2);
  console.log(prueba,6);

  const path = require('path')
  const fs = require('fs');

  const isAbsolute = (file) => (path.isAbsolute(file) ? file : path.resolve(file));
  console.log(isAbsolute('README.md'),12);

  const  isExit = (rote) => fs.existsSync(rote);
  console.log(isExit('C://Users//Laboratoria//Documents//GitHub//LIM015-md-links//README.md'),15);

  




  module.exports = {
    prueba:prueba,
    isAbsolute:isAbsolute,
    isExit:isExit,
  };