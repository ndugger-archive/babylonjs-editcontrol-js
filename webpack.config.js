module.exports = {
    entry: __dirname + '/src/editcontrol.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'editcontrol.js',
        libraryTarget: 'commonjs2'
    },
    externals: [
        {
            babylonjs: true
        }
    ],
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test:  /\.js$/,
                loader: 'babel-loader?{ "presets": ["es2015", "stage-0"] }'
            }
        ]
    }
}
