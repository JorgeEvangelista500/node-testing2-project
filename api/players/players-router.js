const router = require('express').Router()
const Players = require('./players-model')



router.get("/", (req, res, next) => {
    Players.getAll()
      .then(player => {
        res.status(200).json(player)
      })
      .catch(next)
  });

  



module.exports = router