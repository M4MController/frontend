module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'google'],
  env: {
    browser: true,
  },
  rules: {
    'indent': [
      'error',
      2, {
        'CallExpression': {'arguments': 1},
        "SwitchCase": 1
      },
    ],
    'require-jsdoc': 0,
    'max-len': [
      1, {
        code: 120,
      },
    ],
  },
};
