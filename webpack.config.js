var webpack = require('webpack'),
    path = require('path');

var VENDOR_LIBS = [
    'react',
    'react-router',
    'flux',
    'immutable',
    'jquery',
    'bluebird',
    'eventemitter2',
    'classnames',
    'leaflet',
    'firebase',
    'react-pure',
    'spin.js'
];
var embedFileSize = 65536;

module.exports = {
    entry: {
        app: './app/javascript/routes.jsx',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, '/app/build'),
        filename: "bundle.js",
        publicPath: 'http://localhost:8080/app/build/',
    },
    resolve: {
        root: path.resolve('./app/javascript'),
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules'],
    },
    module: {
        preLoaders: [
          {
            test: /\.jsx$/,
            loaders: ['eslint'],
            include: [new RegExp(path.join(__dirname, 'app'))],
            exclude: /node_modules/
          }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=' + embedFileSize
            }
        ]
    },
    eslint: {
        configFile: '.eslintrc',
        emitError: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName= */"vendor", /* filename= */"vendor.bundle.js"
        )
    ],
    devtool: 'source-map' // source maps with debugging, slow
    //devtool: 'eval-source-map'
};