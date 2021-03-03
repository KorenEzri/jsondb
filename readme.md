# JsonDB - a locally hosted, easy-to-use npm-packed database :D

## Purpose

Basically, it's a very easy-to-use database you can install and run on your local host along with another server(s). Examples, explanations etc as follows:

## Installation

1) In your terminal, just run *npm i @korenezri/jsondb* . This will set you up with the latest version.

![pic_one](https://github.com/KorenEzri/jsondb/blob/main/npmi.PNG)

## Usage

To use, go to your project's main package.json file, and in the "scripts" object, add the following lines:
### "database": "node node_modules/@korenezri/jsondb/server.js"

![pic_two](https://github.com/KorenEzri/jsondb/blob/main/dbasejsondb.PNG)

### Now to activate the server, make sure PORT 3001 is free and type in the terminal: *npm run database* (or whichever name you picked for it)

NOTE: "database" is just the name I picked - you can do anything you like.


## Running this database-server along with another locally-hosted node.js server (or more!):

- Install the NPM package "Concurrently" by typing *npm i concurrently*
- In your project's main package.json file, add the following code to the "scripts" section:

-  **"database": "node node_modules/@korenezri/jsondb/server.js"** - This is the jsonDB databse
-  **"main": "node index.js"** - Your own node.js server you're trying to run
-  **"start": "concurrently \"npm run main\" \"npm run database\""** - Set up the 'concurrently' package

![pic_three](https://github.com/KorenEzri/jsondb/blob/main/multipleservers.PNG)

To run, just type **npm start** in the terminal:

![gif_one](https://github.com/KorenEzri/jsondb/blob/main/jsondbexamplegif.gif)

# Author: Koren Ben Ezri
