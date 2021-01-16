const express = require('express')
const webpack = require('webpack')
const wpmiddleware = require('webpack-dev-middleware')
const path = require('path')
const webpackConfig = require('../webpack.config')
console.log(webpackConfig)
const compiler = webpack(webpackConfig)
const CURR_PATH = process.env.NODE_ENV === 'prod' ? path.join(__dirname, '../dist/') : path.join(__dirname, '../dev/');
const PORT = process.env.NODE_ENV === 'prod' ? 2000 : 3000;
console.log(process.env.NODE_ENV)

const App = express()

App.use(
    wpmiddleware(compiler, {
        publicPath: '/'
    })
)

App.use(require("webpack-hot-middleware")(compiler));

App.get('/', (req, res) => {
    console.log(CURR_PATH)
    res.sendFile(CURR_PATH + 'index.html');
})

App.get('/*', (req, res) => {
    console.log(CURR_PATH)
    console.log(req.url)
    res.sendFile(path.join(CURR_PATH + 'index.html'));
})

App.listen(PORT, () => {
    console.log('Application is running on port ' + PORT)
})

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    process.exit(1);
  });