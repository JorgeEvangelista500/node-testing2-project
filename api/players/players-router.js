const router = require('express').Router()

const Players = require('./players-model')

router.get('/', (req, res, next) => {
    Players.getAll()
        .then(players => {
            res.status(200).json(players)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Players.getAll()
        .then(players => {
            res.status(200).json(players)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Players.getAll()
        .then(players => {
            res.status(200).json(players)
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Players.getAll()
        .then(players => {
            res.status(200).json(players)
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Players.getAll()
        .then(players => {
            res.status(200).json(players)
        })
        .catch(next)
})

module.exports = router