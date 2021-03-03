//BASE PREP
const express = require("express");
const uuid = require("uuid");
const fs = require("fs");
const app = express();

app.use(function (req, res, next) {
  setTimeout(next, 1000);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//BASE END

const viewAllBins = () => {
  const listOfBins = [];
  const binsDirectory = fs.readdirSync(`backend/bins/`);
  binsDirectory.forEach((file) => {
    listOfBins.push(file);
  });
  return listOfBins;
};

//ROUTES

//////////////////////////////////////////////////
//BIN-SPECIFIC ROUTES
//////////////////////////////////////////////////

//on GET request: show all bin IDs
app.get("/all", (req, res) => {
  const listOfBins = viewAllBins();
  if (listOfBins.length < 1) {
    return res.status(404).json({
      msg: `No bins found`,
    });
  } else {
    res.status(200).send(listOfBins);
  }
});

//on GET request: if the specified ID exists, show appropriate bin (show ToDoList basically)
app.get("/b/:id", (req, res) => {
  fs.readFile(`backend/bins/${req.params.id}.json`, "utf8", (err, data) => {
    if (
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        req.params.id
      ) &&
      req.params.id !== "cyber4s" &&
      req.params.id !== "default"
    ) {
      res.status(404).json(`This ID "${req.params.id}" is not a legal bin-ID.`);
    } else if (!data) {
      res.status(400).json(`No bin found by the id of ${req.params.id}`);
    } else {
      res.status(200).send(JSON.stringify(JSON.parse(data), null, 2));
    }
  });
});

//on a POST request, CREATE a new bin, assign an ID to it, and show it
app.post("/", (req, res) => {
  const binID = uuid.v4();
  let obj = { record: [] };
  let json = JSON.stringify(obj, null, 2);
  const response = [];
  try {
    // if (req.body) {
    //   response.push(
    //     new Error(
    //       "NEW BIN REQUESTS MUST BE OF EMPTY BINS ONLY. REMOVING DATA AND CREATING AN EMPTY BIN."
    //     )
    //   );
    // }
    response.push(binID);
    fs.writeFile(`backend/bins/${binID}.json`, `${json}`, "utf8", () => {
      res.json(`${response}`);
    });
  } catch {
    res.status(400).send(`ERROR!, ${err}`);
  }
});

//on PUT request: update the bin according to it's id
app.put("/b/:id", (req, res, next) => {
  if (
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      req.params.id
    ) &&
    req.params.id !== "cyber4s" &&
    req.params.id !== "default"
  ) {
    res.status(404).json(`This ID "${req.params.id}" is not a legal bin-ID.`);
  }
  const BIN_ID = req.params.id;
  let obj = { record: [] };
  obj.record.push(req.body);
  let json = JSON.stringify(obj, null, 2);
  const listOfBins = viewAllBins();
  console.log(listOfBins);
  if (!listOfBins.includes(`${BIN_ID}.json`)) {
    res.status(400).json(`File ${BIN_ID} not found`);
  } else {
    fs.writeFile(`backend/bins/${BIN_ID}.json`, json, "utf8", (data) => {
      res.status(201).send(req.body);
    });
  }
});

//on DELETE request: delete the specified bin
app.delete("/b/:id", (req, res) => {
  const BIN_ID = req.params.id;
  const path = `backend/bins/${BIN_ID}.json`;
  const listOfBins = viewAllBins();
  if (
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      BIN_ID
    ) &&
    BIN_ID !== "cyber4s" &&
    BIN_ID !== "default"
  ) {
    return res.status(404).json(`This ID "${BIN_ID}" is not a legal bin-ID.`);
  } else if (!listOfBins.includes(`${BIN_ID}.json`)) {
    return res.status(400).json(`File ${BIN_ID} not found`);
  } else
    try {
      fs.unlinkSync(path);
      res.status(204).send(`Deleted ${BIN_ID}`);
    } catch (err) {
      console.log(err);
    }
});

//ROUTES END

const PORT = process.env.PORT || 3001;

module.exports = app;
// app.listen("3001", () => console.log(`Server Started on port 3001`));
