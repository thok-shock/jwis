const express = require('express')
const path = require('path')

const audioRouter = express.Router()

audioRouter.get('/:name', (req, res) => {
    res.sendFile( path.join(__dirname + '/audio/') + req.params.name)
})

module.exports = audioRouter