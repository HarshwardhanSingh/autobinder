const AutoBindClass = require('./AutoBindClass.js');

module.exports = function({ types: t}) {
  return {
    visitor: {
      ClassDeclaration(path) {
        new AutoBindClass(t).process(path.node);
      }
    }
  };
}