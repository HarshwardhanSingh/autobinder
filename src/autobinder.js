const AutoBinded = require('./AutoBinded.js');

module.exports = function({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path) {
        new AutoBinded(t).process(path.node);
      }
    }
  };
}