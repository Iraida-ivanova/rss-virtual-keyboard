const path = require("path");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const getSettingsForStyles = () => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["autoprefixer"],
                },
            },
        },
        "sass-loader",
    ];
};

module.exports = {
    entry: path.join(srcPath, "index.js"),
    target: !isProd ? "web" : "browserslist",
    devtool: !isProd ? "hidden-source-map" : "eval-source-map",
    output: {
        path: buildPath,
        filename: "bundle.js",
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, "index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css",
        }),
        new ESLintPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: getSettingsForStyles(),
            },
            {
                test: /\.(png | svg | jpg)$/,
                use: "asset/resource",
            },
        ],
    },
    devServer: {
        host: "127.0.0.1",
        port: 9000,
        hot: true,
        historyApiFallback: true,
    }
};