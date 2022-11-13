const HtmlWebpackPlugin=require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: './src/index02_hello.ts',
  module: { rules: [
    { test:    /\.ts$/, 
      use: 'ts-loader', exclude: /node_modules/ },
    { test: /\.(ico)$/, 
      use: 'file-loader?name=src/[name].[ext]' }    
  ] },
  mode: 'development',
  resolve: { 
      extensions: [ ".js", ".ts" ],
      modules: [ 'src', 'node_modules' ]
  },
  plugins: [
    new HtmlWebpackPlugin( 
    { template: './src/index0.html',
       favicon: './src/favicon.ico' } ),
    new webpack.ProvidePlugin(
      {$: 'jquery',jquery: 'jquery'}
    )
  ],
  devServer: { static: './dist' }
}
