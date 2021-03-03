//BASE PREP
const express = require("express");
const uuid = require("uuid");
const fs = require("fs");
const app = express();
const cors = require("cors");
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    preflightContinue: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//BASE END

const viewAllFiles = () => {
  const listOfFiles = [];
  const filesDirectory = fs.readdirSync(
    `node_modules/@korenezri/jsondb/backend/files/`
  );
  filesDirectory.forEach((file) => {
    listOfFiles.push(file);
  });
  return listOfFiles;
};

//ROUTES

//////////////////////////////////////////////////
//FILE-SPECIFIC ROUTES
//////////////////////////////////////////////////

//on GET request: show all file IDs
app.get("/all", (req, res) => {
  const listOfFiles = viewAllFiles();
  if (listOfFiles.length < 1) {
    return res.status(404).json({
      msg: `No files found`,
    });
  } else {
    res.status(200).send(listOfFiles);
  }
});

//on GET request: if the specified ID exists, show appropriate file
app.get("/b/:id", (req, res) => {
  fs.readFile(
    `node_modules/@korenezri/jsondb/backend/files/${req.params.id}.json`,
    "utf8",
    (err, data) => {
      if (
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          req.params.id
        ) &&
        req.params.id !== "default"
      ) {
        res
          .status(404)
          .json(`This ID "${req.params.id}" is not a legal file-ID.`);
      } else if (!data) {
        res.status(400).json(`No file found by the id of ${req.params.id}`);
      } else {
        res.status(200).send(JSON.stringify(JSON.parse(data), null, 2));
      }
    }
  );
});

//on a POST request, CREATE a new file, assign an ID to it, and show it
app.post("/", (req, res) => {
  const fileID = uuid.v4();
  let obj = { record: [] };
  let json = JSON.stringify(obj, null, 2);
  const response = [];
  try {
    response.push(fileID);
    fs.writeFile(
      `node_modules/@korenezri/jsondb/backend/files/${fileID}.json`,
      `${json}`,
      "utf8",
      () => {
        res.json(`${response}`);
      }
    );
  } catch {
    res.status(400).send(`ERROR!, ${err}`);
  }
});

//on PUT request: update the file according to it's id
app.put("/b/:id", (req, res, next) => {
  if (
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      req.params.id
    ) &&
    req.params.id !== "cyber4s" &&
    req.params.id !== "default"
  ) {
    res.status(404).json(`This ID "${req.params.id}" is not a legal file-ID.`);
  }
  const file_ID = req.params.id;
  let obj = { record: [] };
  obj.record.push(req.body);
  let json = JSON.stringify(obj, null, 2);
  const listOffiles = viewAllFiles();
  console.log(listOffiles);
  if (!listOffiles.includes(`${file_ID}.json`)) {
    res.status(400).json(`File ${file_ID} not found`);
  } else {
    fs.writeFile(
      `node_modules/@korenezri/jsondb/backend/files/${file_ID}.json`,
      json,
      "utf8",
      (data) => {
        res.status(201).send(req.body);
      }
    );
  }
});

//on DELETE request: delete the specified file
app.delete("/b/:id", (req, res) => {
  const file_ID = req.params.id;
  const path = `backend/files/${file_ID}.json`;
  const listOffiles = viewAllFiles();
  if (
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      file_ID
    ) &&
    file_ID !== "cyber4s" &&
    file_ID !== "default"
  ) {
    return res.status(404).json(`This ID "${file_ID}" is not a legal file-ID.`);
  } else if (!listOffiles.includes(`${file_ID}.json`)) {
    return res.status(400).json(`File ${file_ID} not found`);
  } else
    try {
      fs.unlinkSync(path);
      res.status(204).send(`Deleted ${file_ID}`);
    } catch (err) {
      console.log(err);
    }
});

//ROUTES END

const PORT = 3001;

module.exports = app;
