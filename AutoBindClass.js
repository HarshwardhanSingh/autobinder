class AutoBindClass {
  constructor(types) {
    this.types = types;
  }

  process(klass) {
    const decorators = this.findDecorators(klass);
    if (decorators.length) {
      const constructorMethod = this.getConstructor(klass);
      const args = this.getClassMethods(klass);

      this.doAssignments(constructorMethod, args);
      this.removeDecorators(klass, decorators);
    }
  }

  getConstructor(klass) {
    return klass.body.body.filter(body => {
      return body.kind === "constructor";
    })[0];
  }

  getClassMethods(klass) {
    const lifeCycleMethods = [
      'constructor',
      'componentWillMount',
      'componentDidMount',
      'render',
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'componentDidUpdate',
      'componentWillUnmount',
      'componentDidCatch',
    ];
    return klass.body.body.filter(body => {
      return (lifeCycleMethods.indexOf(body.kind) === -1);
    });
  }

  doAssignments(constructorMethod, args) {
    const body = constructorMethod.body.body;
    args
      .reverse()
      .forEach(arg => {
        const assignment = this.buildAssignment(arg.key.name);
        body.unshift(assignment);
      });
  }

  buildAssignment(arg) {
    const self = this.types.identifier("this");
    const prop = this.types.memberExpression(self, this.types.identifier(arg));
    const bindedProp = this.types.memberExpression(prop, this.types.identifier("bind"));
    const bindedCallExpression = this.types.callExpression(bindedProp, [self]);
    const assignment = this.types.assignmentExpression("=", prop, bindedCallExpression);

    return this.types.expressionStatement(assignment);
  }

  findDecorators(klass) {
    return (klass.decorators || []).filter(decorator => {
      return decorator.expression.name === "autobind";
    });
  }

  removeDecorators(klass, decorators) {
    decorators.forEach((decorator) => {
      const index = klass.decorators.indexOf(decorator);
      if (index >= 0) {
        klass.decorators.splice(index, 1);
      }
    });
  }
}

module.exports = AutoBindClass;