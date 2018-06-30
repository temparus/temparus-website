const config = {
  context: `${__dirname}/src`, // `__dirname` is root of project and `src` is source

  entry: ['babel-polyfill', './index.js'],

  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    filename: 'bundle.js',
  },

  // To run development server
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist/',
    compress: true,
    port: 9000,
    hot: true,
    index: 'index.html',
    historyApiFallback: {
      index: 'index.html',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: [['env', { targets: 'last 2 years' }]] },
          },
        ],
      },
      {
        test: /src\/views\/images\/[a-zA-Z\d\/]+\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: '[name].[ext]',
              outputPath: '/',
              publicPath: 'dist/',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
    ],
  },

  // Dynamically include config
  resolve: {
    alias: {
      config: `${__dirname}/config.js`,
    },
  },

  devtool: 'eval-source-map', // Default development sourcemap
};

module.exports = config;
