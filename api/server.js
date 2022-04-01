
const playersRouter = require('./players/players-router')

const express = require("express");
const server = express();
const Players = require('./players/players-model')

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });


server.get("/players", (req, res, next) => {
  Players.getAll()
    .then(player => {
      res.status(200).json(player)
    })
    .catch(next)
});

server.get("/players/:id", (req, res, next) => {
  Players.getById(req.params.id)
    .then(player => {
      res.status(200).json(player)
    })
    .catch(next)
});

server.post("/players", (req, res, next) => {
  Players.insert(req.body)
    .then(player => {
      res.status(201).json(player)
    })
    .catch(next)
});

server.delete("/players/:id", (req, res, next) => {
  Players.remove(req.params.id)
    .then(player => {
      res.json(player)
    })
    .catch(next)
});

server.put("/players/:id", (req, res, next) => {
  Players.update(req.params.id, req.body)
    .then(player => {
      res.json(player) 
    })
    .catch(next)
})



server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

 module.exports = server;