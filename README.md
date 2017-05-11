# MM Signal

## Usage

### Basic

Basic example.

```js
import Signal from 'mm-signal'

 const cb = function() {console.log("callback");};
 const signal = new Signal();
 signal.add(cb);
 signal.dispatch();
```

## Build

To build the sources with `babel` in `./lib` directory :

```sh
npm run build
```

## Documentation

To generate the `JSDoc` :

```sh
npm run docs
```

To generate the documentation and deploy on `gh-pages` branch :

```sh
npm run docs:deploy
```

## Testing

To run the tests, first clone the repository and install its dependencies :

```sh
git clone https://github.com/MM56/mm-signal.git
cd mm-signal
npm install
```

Then, run the tests :

```sh
npm test
```

To watch (test-driven development) :

```sh
npm run test:watch
```

For coverage :

```sh
npm run test:coverage
```