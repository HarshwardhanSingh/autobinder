class AutoBinded {
  constructor(types) {
    this.types = types;
  }

  process(klass) {
    const decorators = this.findautoBindDecorators(klass);

    if (decorators.length) {
      const ctor = this.findConstructor(klass);
      const args = this.getClassMethods(klass);
      this.prependAssignments(ctor, args);
    }
  }

  findConstructor(klass) {
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

  prependAssignments(ctor, args) {
    const body = ctor.body.body;
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

  findautoBindDecorators(klass) {
    return (klass.decorators || []).filter(decorator => {
      return decorator.expression.name === "autoBind";
    });
  }
}