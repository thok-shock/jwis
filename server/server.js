const express = require('express')
const webpack = require('webpack')
const wpmiddleware = require('webpack-dev-middleware')
const path = require('path')
const webpackConfig = require('../webpack.config')
//console.log(webpackConfig)
const compiler = webpack(webpackConfig)
const CURR_PATH = process.env.NODE_ENV === 'prod' ? path.join(__dirname, '../dist/') : path.join(__dirname, '../dev/');
const PORT = process.env.NODE_ENV === 'prod' ? 2000 : 3000;
console.log(process.env.NODE_ENV)
const ItemAPI = require('./ItemAPI')
const audioRouter = require('./audio')
const fetch = require('node-fetch')

const App = express()

if(process.env.NODE_ENV != 'prod') {
App.use(
    wpmiddleware(compiler, {
        publicPath: '/'
    })
)

App.use(require("webpack-hot-middleware")(compiler));
}

App.use(express.json()) // for parsing application/json
App.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

App.get('/', (req, res) => {
    console.log(CURR_PATH)
    res.sendFile(CURR_PATH + 'index.html');
})

App.use('/items', ItemAPI)

App.use('/audio', audioRouter)

App.get('/index_bundle.js', (req, res) => {
    res.sendFile(CURR_PATH + 'index_bundle.js')
})

App.get('/*', (req, res) => {
    console.log(CURR_PATH)
    //console.log(req.url)
    res.sendFile(path.join(CURR_PATH + 'index.html'));
})

App.listen(PORT, () => {
    console.log('Application is running on port ' + PORT)
})

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    process.exit(1);
  });
