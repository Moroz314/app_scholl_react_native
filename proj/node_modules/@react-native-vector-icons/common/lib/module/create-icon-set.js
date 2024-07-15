function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { PixelRatio, Platform, Text, processColor } from 'react-native';
import NativeIconAPI from './NativeVectorIcons';
import createIconSourceCache from './create-icon-source-cache';
import ensureNativeModuleAvailable from './ensure-native-module-available';
export const DEFAULT_ICON_SIZE = 12;
export const DEFAULT_ICON_COLOR = 'black';
export const createIconSet = (glyphMap, fontFamily, fontFile, fontStyle) => {
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder.
  const fontBasename = fontFile ? fontFile.replace(/\.(otf|ttf)$/, '') : fontFamily;
  const fontReference = Platform.select({
    windows: `/Assets/${fontFile}#${fontFamily}`,
    android: fontBasename,
    web: fontBasename,
    default: fontFamily
  });
  const resolveGlyph = name => {
    const glyph = glyphMap[name] || '?';
    if (typeof glyph === 'number') {
      return String.fromCodePoint(glyph);
    }
    return glyph;
  };
  const Icon = ({
    name,
    size = DEFAULT_ICON_SIZE,
    color,
    style,
    children,
    allowFontScaling = false,
    innerRef,
    ...props
  }) => {
    const glyph = name ? resolveGlyph(name) : '';
    const styleDefaults = {
      fontSize: size,
      color
    };
    const styleOverrides = {
      fontFamily: fontReference,
      fontWeight: 'normal',
      fontStyle: 'normal'
    };
    const newProps = {
      ...props,
      style: [styleDefaults, style, styleOverrides, fontStyle || {}],
      allowFontScaling
    };
    return /*#__PURE__*/React.createElement(Text, _extends({
      ref: innerRef,
      selectable: false
    }, newProps), glyph, children);
  };
  const WrappedIcon = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(Icon, _extends({
    innerRef: ref
  }, props)));
  WrappedIcon.displayName = 'Icon';
  const imageSourceCache = createIconSourceCache();
  const getImageSourceSync = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
    ensureNativeModuleAvailable();
    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${String(processedColor)}`;
    if (imageSourceCache.has(cacheKey)) {
      // FIXME: Should this check if it's an error and throw it again?
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = NativeIconAPI.getImageForFontSync(fontReference, glyph, size, processedColor // FIXME what if a non existant colour was passed in?
      );
      const value = {
        uri: imagePath,
        scale: PixelRatio.get()
      };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  };
  const getImageSource = async (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
    ensureNativeModuleAvailable();
    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${String(processedColor)}`;
    if (imageSourceCache.has(cacheKey)) {
      // FIXME: Should this check if it's an error and throw it again?
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = await NativeIconAPI.getImageForFont(fontReference, glyph, size, processedColor // FIXME what if a non existant colour was passed in?
      );
      const value = {
        uri: imagePath,
        scale: PixelRatio.get()
      };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  };
  const loadFont = async () => {
    if (Platform.OS !== 'ios') {
      return;
    }
    ensureNativeModuleAvailable();
    const [filename, extension] = fontFile.split('.'); // FIXME: what if filename has two dots?
    if (!filename) {
      // NOTE: Thie is impossible but TypeScript doesn't know that
      throw new Error('Font needs a filename.');
    }
    if (!extension) {
      throw new Error('Font needs a filename extensison.');
    }
    await NativeIconAPI.loadFontWithFileName(filename, extension, 'react-native-vector-icons');
  };
  loadFont();
  const IconNamespace = Object.assign(WrappedIcon, {
    getImageSource,
    getImageSourceSync
  });
  return IconNamespace;
};
//# sourceMappingURL=create-icon-set.js.map