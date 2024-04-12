module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },

          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
};
