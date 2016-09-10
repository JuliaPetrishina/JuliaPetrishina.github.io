module.exports = {
  // context: __dirname + "/app",
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
  watch: true
};
