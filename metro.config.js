const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix for Windows file watching issues
config.watchman = {
  enabled: true,
};

config.resolver = {
  ...config.resolver,
  sourceExts: ["mjs", "ts", "tsx", "json", "js", "jsx"],
};

module.exports = withNativeWind(config, { input: "./app/global.css" });
