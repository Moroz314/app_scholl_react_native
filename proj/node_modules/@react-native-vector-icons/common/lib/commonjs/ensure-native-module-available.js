"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureNativeModuleAvailable;
var _NativeVectorIcons = _interopRequireDefault(require("./NativeVectorIcons"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ensureNativeModuleAvailable() {
  if (!_NativeVectorIcons.default) {
    throw new Error('The native RNVectorIcons API is not available, did you properly integrate the module? Please verify your autolinking setup and recompile.');
  }
}
//# sourceMappingURL=ensure-native-module-available.js.map