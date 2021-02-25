# Learning ExpressJS 01 #

## 0. Installing express.js ##

inside a new project folder
```console
$ npm init
```

install express.js via npm
```console
$ npm i express --save
```

Now create a js file to start the server (e.g. index.js).

- - - -

## 1. Setting up the server ##

The below code is for the e.g. index.js file.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log('Server ready'))
```

- - - -

## 2. Serving static files ##

```js
const express = require('express')
const app = express()

app.use(express.static('public'))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log('Server ready'))
```
In the "public" directory, static files such as index.html can be located.

- - - -

## 3. More flexible code ##

With port as a variable
```js
const port = 3000

app.listen(port, () => console.log(`Server ready at http://localhost:${port}`))
```

With a broader static directory
```js
app.use('/static', express.static('public'))
```

or with an absolute path method
```js
app.use('/static', express.static(__dirname, 'public'))
```

- - - -

## 4. Starting up the server ##

On the terminal, enter:
```console
$ node index.js
```