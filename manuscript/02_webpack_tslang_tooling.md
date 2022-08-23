

# Language Tooling

## Typescript Build-Tools

*(In which we set up our development environment with the typescript language.)*

### Setting up our programming language environment to code our game in

We will run our game in a web browser window, and we will program it with javascript code - almost. We will program in the language **typescript**, which is a practical way to write javascript. As its name suggests, it adds **types** to javascript, and types are a wonderful aid when making **larger** programs, and when making **changes** to larger programs. And as you build a large program, you **will** make *changes* to your existing parts. 

If we stuck with plain javascript, we wouldn't need setup - we could just open up a text editor, and start plopping in javascript code (we'd still need some webserver to get that code into a web-browser though). But trust that I have tried doing that, and it was so painful, I refused to make any more javascript games, unless typescript was there to help me. The way typescript and types help us, is that they keep track of all the rules and promises we make to ourselves, as we build our game. It will helpfully tell us "remember that you promised, that you would always specify an (x,y) position for the monsters in your game. Well, in line 187 and 453 of file nnn, it seems you forgot to include the (x,y) values? Can you fix that?"

That may *sound* like a nuisance, but a *real nuisance* is, when you have played for 3 hours, and your hero suddenly dies on level 7, because you forgot to specify a comma somewhere. I say all this, to motivate why we now spend the following efforts to get our hands on typescript, when we instead could have just started writing javascript within 60 seconds.

To get our typescript setup, we will set up a kind of bottle-ship. Our end goal is to get javascript into a web **browser**. But web browsers show stuff they get from web **servers**. And also, we have typescript, which must be **translated** to javascript. And web browsers don't really show javascript, they show **web pages with** javascript. So we need 3 things - our typescript into javascript, our javascript into a web page, and our web page into a web server (and from there, finally into a browser).

Luckily for us, there are systems that **do just that**, made by and for people with similar needs. The foundation is **nodejs**, a javascript engine and environment, which you can download and install. Once you have node.js, it can do two things for you: It can run javascript (big surprise there), and it can install, manage and run javascript **modules**. This means we can install a bunch of **node modules** that do those three things we need.

The central module for us is a system called **webpack**. It interfaces to all the things we need, and need taken care of. Webpack will orchestrate turning typescript to **javascript**, getting that javascript into a **web page**, and even run a tiny and clever **webserver** to deliver our page and scripts to the browser. 

With those promises made, let's look at what we need. First, we name and make a folder for **our** node module, in which we will build our game:

```cmd
mkdir mygame
cd mygame
npm init
```

`npm` is the **node package manager**, and controls everything about nodejs javascript **modules**. Now with a module of our own, we can install the packages we need. Our node module shopping list is as follows. You can go ahead and install them all.

```cmd
npm install -D typescript
npm install -D webpack-cli
npm install -D webpack@^4
npm install -D ts-loader
npm install -D @types/jquery
npm install -D jquery
npm install -D webpack-dev-server
npm install -D html-webpack-plugin@^4
npm install -D file-loader
```

What are all those parts, actually? Well,

- The **typescript** module is the general engine that can translate typescript to javascript. 
- **webpack** and **webpack-cli**, is the 'forklift' that integrates all these parts we are bringing in. 
- **ts-loader** lets webpack operate the typescript module (it's the interface between those two). 
- The two **jquery** things, are the definitions for JQuery, and JQuery itself (in other words, if you forego JQuery, you can leave these out). 
- **webpack-dev-server** is the test-webserver built into webpack - it means you don't need to get hold of a 'real' webserver - you can think of it as 'batteries-included'. 
- Finally, the **file-loader** lets the dev-server serve ordinary files as well, which 'is a thing it just needs' (hint: favicon.ico). 

In this chapter, we are **not** going to explain in depth what all those moving parts do. There is an appendix chapter which goes into those details about typescript, javascript, webpack, dev-server. Here, our focus is on getting a typescript environment up and running, without getting bogged down by all the tiny wheels and gears within webpack. 

With this excuse, I dump the following incomprehensible heap of steaming `webpack.config.js` on your head:

```javascript
const HtmlWebpackPlugin=require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: './src/index02_hello.ts',
  module: { rules: [
    { test:    /\.ts$/, 
      use: 'ts-loader', exclude: /node_modules/ },
    { test: /\.(ico)$/, 
      use: 'file-loader?name=src/[name].[ext]' }    
  ] },
  mode: 'development',
  resolve: { 
      extensions: [ ".js", ".ts" ],
      modules: [ 'src', 'node_modules' ]
  },
  plugins: [
    new HtmlWebpackPlugin( 
    { template: './src/index0.html',
       favicon: './src/favicon.ico' } ),
    new webpack.ProvidePlugin(
      {$: 'jquery',jquery: 'jquery'}
    )
  ],
  devServer: { 
      static: './dist'
      // contentBase: './dist' 
      // alas, recently renamed to static.
  }
}
```

To allow us to run, we also need a `tsconfig.json`, which must contain the following. `baseUrl` is what allows us to import our own types from our module source root. Without it, we would get those weird '../..' paths when we import our own stuff. All the rest are good and safe defaults, which will protect us against cutting ourselves. You can leave out basically all of them, but that will just allow you to have more undetected bugs.

```typescript
{ "compilerOptions": {
    "baseUrl": "./src",
    "target": "ES2020", // or stick to "ES6",
    "strict": true,
    "alwaysStrict": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noFallthroughCasesInSwitch": true    
} } // possibly missing noImplicitAny
```

And then, we need a sprinkle of source code. We need some definite typescript, which you'll put in a subfolder src - so, `src/index02_hello.ts`:

```typescript
let test:string = 'Hello Typescript!';
console.log(test);
document.body.textContent = test;
```

And a webpage `src/index0.html` to host it in. We could make do with this tiny bit:

```html
<!DOCTYPE html>
<html> <body id="body1">
  Hello!
  <canvas id="canvas1"></canvas>
</body> </html>
```

But we'll use this more complete version, which includes stuff we want to be there. There is a graphics canvas we are going to draw on, and some sensible default settings (getting rid of default margin, setting proper encoding, and a background color that lets us see how the canvas is doing).

````html
<!DOCTYPE html>
<html>

  <head>
    <style>
      body { margin: 0px; }
      canvas { background: lightblue; }
    </style>
    <meta charset="utf-8">
  </head>

  <body id="body1">
    <canvas id="canvas1"></canvas>
  </body>
</html>
````

We are now almost ready to type `npm start`. In order to do that, we have to **add** the `start` script to our `package.json`, so the script section will look like this:

```json
..
"scripts": {
    "start": "webpack serve --open",
    "test": "t"
  },
..
```

Our start script is this part:

```json
    "start": "webpack serve --open",
```

With this, you can type `npm start` (in the root of your `mygame` folder), and your tiny web page with typescript code should hopefully compile and run, and show up in a web browser looking like this. 

![index0_typescript](./img/index0_typescript2.png)

Typically, if you press the key `F12` in your web browser, it will show the **javascript console**, where you can see the output 'Hello Typescript'. 

![npm_console](./img/npm_console.png)

If you want to manually specify which `indexN.ts` to run, on the command-line, you can do so like this:

`npx webpack serve --open --entry ./src/index02_hello.ts`

or even shortened to this (depending on your webpack config).

`npx webpack serve --open --entry index02_hello.ts`

