module.exports = {
  devtool: 'inline-source-map',
  entry: "./js/index",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules',
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },
    ]
  },
  watch: true
};
