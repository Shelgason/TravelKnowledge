module.exports = {
  extends: ['../../eslint.config.base.js', 'next/core-web-vitals'],
  settings: {
    next: {
      rootDir: __dirname,
    },
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};
