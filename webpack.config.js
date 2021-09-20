const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[path].[name].js",
    },

    devServer: {
        port: 3000,
        static: "./dist",
    },

    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                // для використання css і sass
                test: /.(css|s[ac]ss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /.(jp[e]|pn|sv)g$/,
                use: ["file-loader"],
            },
        ],
    },
};
