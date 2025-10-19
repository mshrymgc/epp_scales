import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    mode: 'production',
    name: 'hexaco60',
    entry: './src/hexaco60.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'hexaco60.[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/templates/hexaco60.html',
        filename: 'hexaco60.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true,
        },
      }),
    ],
  },
];
