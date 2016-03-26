/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */

const path = require('path');

const rootPath = path.resolve(__dirname, './');
const paths = {
    rootPath: rootPath,
    srcPath: path.join(rootPath, 'src'),
    testPath: path.join(rootPath, 'tests'),
    urlPath: "http://localhost:8000"
};

module.exports = {
    paths: paths
};