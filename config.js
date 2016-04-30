/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */

const path = require('path');

const rootPath = path.resolve(__dirname, './');
var paths = {
    rootPath: rootPath,
    srcPath: path.join(rootPath, 'src'),
    distPath: path.join(rootPath, "dist"),
    urlPath: "http://localhost:8000",
    debugPort: 8000,
    publicPath: "file://" + path.join(rootPath, "index.html")
};

module.exports = {
    paths: paths
};