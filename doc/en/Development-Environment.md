# Development Environment

## Platform

This app is developed on Node.js , Version 5.9.0.

## Framework

Electron is used as the development frame, version 0.37.2, it's installed globally and thus not contained in 'package.json', you need to install it:

    :::bash
    npm install electron-prebuilt@0.37.2 -g

At web side, this app uses React.js, so you need some basics understandings of react components.

## Build Tool

This app uses Grunt and Webpack as building tool and be aware, Grunt also need to be installed gloablly:

    :::bash
    npm install grunt-cil -g
    
## Others

Cross-platform deploying might need some extra lib dependency, and you need to fix it yourself.
    
## Quick Start

After node, npm, electron and grunt are all installed, clode this project to local and execute:

    :::bash
    npm install

After all dependencies are installed, run:

    :::bash
    grunt
    
Compile the code and start the debugging server. run:

    :::bash
    electron mainDev.js
    
The app is now ready for debugging.
Under the BooksForTest there are three notebook used for debugging, you can also open the docs under doc folder. 