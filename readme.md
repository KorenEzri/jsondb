![](https://img.shields.io/badge/jsonDB-By%20Koren-brightgreen)

# JsonDB - a locally hosted, easy-to-use npm-packed database :D

## Purpose

Basically, it's a very easy-to-use database you can install and run on your local host along with another server(s). Examples, explanations etc as follows:

# (A note for Cyber4s students: Please view the bottom part to see how to best use this as a DB for your tasks)

## Installation

1) In your terminal, just run *npm i @korenezri/jsondb* . This will set you up with the latest version.

![pic_one](https://github.com/KorenEzri/jsondb/blob/main/npmi.PNG)

## Usage

This database offers various endpoints for CRUD operations on JSON files - specific endpoints will be specified in the bottom of this document.

To use, go to your project's main package.json file, and in the "scripts" object, add the following lines:
### "database": "node node_modules/@korenezri/jsondb/server.js"

![pic_two](https://github.com/KorenEzri/jsondb/blob/main/dbasejsondb.PNG)

### Now to activate the server, make sure PORT 3001 is free and type in the terminal: *npm run database* (or whichever name you picked for it)

NOTE: "database" is just the name I picked - you can do anything you like.


## Running this database-server along with another locally-hosted node.js server (or more!):

- Install the NPM package "Concurrently" by typing *npm i concurrently*
- In your project's main package.json file, add the following code to the "scripts" section:

-  <code>"database": "node node_modules/@korenezri/jsondb/server.js"</code> - This is the jsonDB databse
-  <code>"main": "node index.js"</code> - Your own node.js server you're trying to run
-  <code>"start": "concurrently \ "npm run main\" \ "npm run database\""</code> - Set up the 'concurrently' package (NO SPACES BETWEEN \ and " - this is just Github's formatting.

![pic_three](https://github.com/KorenEzri/jsondb/blob/main/multipleservers.PNG)

To run, just type **npm start** in the terminal:

![gif_one](https://github.com/KorenEzri/jsondb/blob/main/jsondbexamplegif.gif)


## Available end-points 

Each JSON file created will have a different unique ID via the uuid npm package. JSON files are structured as follows when first created:

<code> {
  "record": [

  ]
}
</code>

- View all JSON files: a GET request to <code>/all</code> (this gives you an array of file names!)
- View specific JSON file (if it exists): a GET request to <code>/b/:id</code> (this gives you the actual file contents)
- Create a JSON file: a POST request to <code>/</code>
- Update a JSON file by ID: a PUT request to <code>/b/:id</code>
- Delete a JSON file by ID: a DELETE request to <code>/b/:id</code>

# Using as a database - "default.json and users.json"

Basically, the package comes with two default bins that you can update regularly, their IDs respectively are "default" and "users" (unlike any other new bin you create which will be given a random uuid id). **You should only use those two as your database as they will always be there when you install the package and you won't need to change your code** . Remember - running npmi on a new computer will download the package anew, and will not have all the other bins your created - just two empty default bins - "default" and "users".

### Dependencies

- body-parser: 1.19.0
- cors: 2.8.5
- express: 4.17.1
- moment: 2.29.1
- uuid: 8.3.2
    

# Author: Koren Ben Ezri
