module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  return {
    presets: ['babel-preset-expo'],

    plugins: [
      ["module-resolver", {
        root: ["./src"],
      }
      ]
    ]
  };
};
