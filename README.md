# babel-plugin-auto-binder
[![Maintainability](https://api.codeclimate.com/v1/badges/33a25ae1b4b593afa94f/maintainability)](https://codeclimate.com/github/HarshwardhanSingh/autobinder/maintainability)  

## Inspiration:
Every time I write a new component method I have to bind in the constructor so that it can access `this`.  

Example:
`this.doStuff = this.doStuff.bind(this);`

Now if you forget to bind your method, you will face very weird bugs which can be frustating. `babel-plugin-auto-binder` will take care of this issue by doing this binding behind the scene so you just worry about the functionality.

If you are using or prefer using arrow functions then you don't need this plugin as the arrow function have the `this` context from the scope they are declared in.    

## Performance:
This plugin binds your class methods (does not binds react lifecycle methods in React) only once in constructor which is a big performance plus.

## Getting Started

### Setting up
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

  doStuff() {
    //some api calls
  }

  render() {
    return (
      <div>
        <SomeComponent onSubmit={this.doStuff} />
      </div>
    )
  }
}
```
and that's it!!

The above input will get transformed to
```
class App extends Component {
  constructor() {
    super();

    this.doStuff = this.doStuff.bind(this);
  }

  doStuff() {
    //some api calls
  }

  render() {
    return (
      <div>
        <SomeComponent onSubmit={this.doStuff} />
      </div>
    )
  }
}

```


