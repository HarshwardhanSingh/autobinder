# babel-plugin-auto-binder

Every time I write a new component method I have to bind in the constructor so that it can access `this`.  

Example:
`this.doStuff = this.doStuff.bind(this);`

Now it you forget to bind your this nice method, you will face very weird bugs which can be frustating. `babel-plugin-auto-binder` will take care of this issue by doing this binding itself so you just worry about functionality.

## Getting Started

#### Setting up
1. `npm i -D babel-plugin-auto-binder`
2. `npm i -D babel-plugin-transform-decorators-legacy`
3. Update your `.babelrc` configuration by adding
```
{
  "plugins" : [
    "auto-binder",
    "transform-decorators-legacy",
  ]
}
```
### Usage
Decorate your class with `@autobind` decorator like this:
```
@autobind
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        Hello World
      </div>
    )
  }
}
```

and that's it!!

### Warning: Very alpha code, don't use in production just yet.