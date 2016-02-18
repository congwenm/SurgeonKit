// Generated on Mon Feb 22 2016 16:44:57 GMT-0600 (CST)
// Karma configuration
var webpackCfg = require('./webpack.config');

module.exports = function(config) {
  config.set({
// base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['phantomjs-shim', 'jasmine', 'es6-shim'],

    // list of files / patterns to load in the browser
    files: [
      'build/*.js',
      'spec/*_spec.js'
    ],

    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-es6-shim"),
      require("karma-phantomjs-shim"),
      require("karma-phantomjs-launcher")
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/*.js': [ 'webpack'],
      'spec/*_spec.js': [ 'webpack']
    },

    webpack: webpackCfg,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
  })
}
