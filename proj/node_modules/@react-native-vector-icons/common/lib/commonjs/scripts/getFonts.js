#!/usr/bin/env node
"use strict";

var _nodeFs = _interopRequireDefault(require("node:fs"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _cliTools = require("@react-native-community/cli-tools");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const rootDir = process.argv[2];
if (!rootDir) {
  throw new Error('Need rootDir as first argument');
}
const getPackageJson = dir => {
  const packageData = _nodeFs.default.readFileSync(_nodePath.default.join(dir, 'package.json'), 'utf-8');
  const packageJson = JSON.parse(packageData);
  return packageJson;
};
const getPackages = () => {
  const rootPackageJson = getPackageJson(rootDir);
  const dependencies = Object.keys(rootPackageJson.dependencies || {});
  const packageDirs = [];
  dependencies.forEach(dependency => {
    const dir = (0, _cliTools.resolveNodeModuleDir)(rootDir, dependency);
    const packageJson = getPackageJson(dir);
    if (packageJson.keywords?.includes?.('react-native-vector-icons-icon')) {
      packageDirs.push(dir);
    }
  });
  return packageDirs;
};
const getFonts = dir => {
  const fontDirs = [`${dir}/fonts`];
  const rootPackageJson = getPackageJson(rootDir);
  const config = rootPackageJson.reactNativeVectorIcons || {};
  fontDirs.push(`${rootDir}/${config.fontDir || 'rnvi-fonts'}`);
  fontDirs.forEach(fontDir => {
    if (!_nodeFs.default.existsSync(fontDir)) {
      return;
    }
    const fonts = _nodeFs.default.readdirSync(fontDir);
    fonts.forEach(font => console.log(`${fontDir}/${font}`)); // eslint-disable-line no-console
  });
};
const packageDirs = getPackages();
packageDirs.forEach(dir => getFonts(dir));
//# sourceMappingURL=getFonts.js.map