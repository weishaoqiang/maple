const path = require('path');
const webpack = require('webpack');
const assetsPath = path.join(__dirname, '..', 'src', 'public', 'assets');

const commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      "presets": ["es2015", "react", "stage-0"]
    },
    include: path.join(__dirname, '..', 'src'),
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
        name: '[hash].[ext]',
        limit: 10000,
    }
  },
  { test: /\.html$/, loader: 'html-loader' }
];

var postCSSConfig = function() {
  return [
    require('postcss-import')({
      path: path.join(__dirname, '..', 'app', 'css'),
      // addDependencyTo is used for hot-reloading in webpack
      addDependencyTo: webpack
    }),
    require('postcss-simple-vars')(),
    // Unwrap nested rules like how Sass does it
    require('postcss-nested')(),
    //  parse CSS and add vendor prefixes to CSS rules
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE > 8']
    }),
    // PostCSS plugins
    require('postcss-reporter')({
      clearMessages: true
    })
  ];
};

module.exports = {
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: 'eval',
    // The configuration for the client
    name: 'browser',
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
    context: path.join(__dirname, '..', 'src'),
    // Multiple entry with hot loader
    // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
    entry: {
      app: './app.jsx'
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: '/assets/'
    },
    module: {
      loaders: commonLoaders.concat([
        { test: /\.css$/,
          loader: 'style!css!postcss-loader'
        }
      ])
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        'app', 'node_modules'
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ],
    postcss: postCSSConfig
};
