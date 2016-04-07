var webpack = require('webpack');
var path = require('path');
var helpers = require('./helpers');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = helpers.hasProcessFlag('hot');

var metadata = {
  title: 'My Webpack',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV,
  HMR: HMR
};

module.exports = {
  metadata: metadata,
  devtool: 'cheap-module-eval-source-map',
  debug: true,
  entry: {
    'polyfills': './src/polyfills.ts',
    'main': './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '/src'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    port: metadata.port,
    host: metadata.host,
    contentBase: './src/public',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    alias: {
      'app': 'src/app'
    }
  },
  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
      // TODO(gdi2290): `exclude: [ helpers.root('node_modules/rxjs') ]` fixed with rxjs 5 beta.3 release
      {test: /\.js$/, loader: "source-map-loader", exclude: [helpers.root('node_modules/rxjs')]}
    ],
    loaders: [
      {
        test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/, helpers.root('node_modules')]
      },
      {test: /\.json$/, loader: 'json-loader', exclude: [helpers.root('node_modules')]},
      {test: /\.css$/, loader: 'raw-loader', exclude: [helpers.root('node_modules')]},
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
      },
      {test: /\.scss$/, exclude: helpers.root('src', 'public/style'), loader: 'raw!postcss!sass'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html'), helpers.root('node_modules')]},
      {test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000'}
    ]
  },
  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity}),
    // static public
    new CopyWebpackPlugin([{from: 'src/public'}]),
    // generating html
    new HtmlWebpackPlugin({template: 'src/index.html'}),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'HMR': HMR
      }
    }),
    //new webpack.ProvidePlugin({
    //  $: 'jquery',
    //  jQuery: 'jquery',
    //  Hammer: 'hammerjs/hammer'
    //}),
    new ExtractTextPlugin('css/[name].[hash].css', {disable: true})
  ],
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ]
};