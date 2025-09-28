module.exports = {
  extends: [
    '../../eslint.config.base.js',
    '@sanity/eslint-config-studio',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};