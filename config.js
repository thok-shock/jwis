{
    mode: MODE,
    entry: {
        home: './src/index.js'
    },
    module: {
      rules: [
        {
            test: /\.css$/i,
            use: ['css-loader']
          },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    output: {
      filename: 'index.js',
      path: CURR_PATH,
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'development'
      })
    ]
  }
  }