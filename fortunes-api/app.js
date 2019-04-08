const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const fortunes = require("./data/fortunes");

const app = express();

app.use(bodyParser.json());

app.get("/fortunes", (req, res) => {
  res.json(fortunes);
});

app.get("/fortunes/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const rFortune = fortunes[randomIndex];
  res.json(rFortune);
});

app.get("/fortunes/:id", (req, res) => {
  const id = JSON.parse(req.params.id);
  const requestedFortune = fortunes.find(fortune => fortune.id === id);
  res.json(requestedFortune);
});

const writeFortunes = json => {
  fs.writeFile("./data/fortunes.json", JSON.stringify(json), err =>
    console.log(err)
  );
};

app.post("/fortunes", (req, res) => {
  const { message, luckyNumber, spiritAnimal } = req.body;
  const fortuneIds = fortunes.map(fortune => fortune.id);
  const fortune = {
    id: (fortunes.length > 0 ? Math.max(...fortuneIds) : 0) + 1,
    message,
    luckyNumber,
    spiritAnimal
  };
  const newFortunes = fortunes.concat(fortune);
  writeFortunes(newFortunes);
  res.json(newFortunes);
});

app.put("/fortunes/:id", (req, res) => {
  const id = JSON.parse(req.params.id);
  const oldFortune = fortunes.find(fortune => fortune.id === id);
  ["message", "luckyNumber", "spiritAnimal"].forEach(key => {
    if (req.body[key]) oldFortune[key] = req.body[key];
  });
  writeFortunes(fortunes);
  res.json(fortunes);
});

app.delete("/fortunes/:id", (req, res) => {
  const id = JSON.parse(req.params.id);
  const newFortunes = fortunes.filter(fortune => fortune.id !== id);
  writeFortunes(newFortunes);
  res.json(newFortunes);
});

module.exports = app;
