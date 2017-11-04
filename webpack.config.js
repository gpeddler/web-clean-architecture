const dotenv = require('dotenv-webpack');

module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: [
        'babel-polyfill',
        `${__dirname}/src/index.tsx`
    ],
    output: {
        path: `${__dirname}/dist/`,
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            core: `${__dirname}/src/core/`,
            data: `${__dirname}/src/data/`,
            ui: `${__dirname}/src/ui/`,
            utils: `${__dirname}/src/utils`,
            application: `${__dirname}/src`
        },
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: ['/node_modules/', '/dist/'],
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: `${__dirname}/tsconfig.json`
                    }
                }
            },
            {
                test: /\.p?css$/,
                exclude: ['/node_modules/', '/dist/'],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            module: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new dotenv()
    ]
};
