const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
    mode: isLocal ? "development" : "production",
    entry: slsw.lib.entries,
    externals: [nodeExternals()],

    devtool: "source-map",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    output: {
        libraryTarget: "commonjs2",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
    },
    target: "node",
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({ analyzerMode: "disabled" }),
    ],
};
