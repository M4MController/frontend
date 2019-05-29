module.exports = {
  env: {
    node: true,
    es6: true,
  },
  root: true,
  extends: ['eslint:recommended', 'google'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'require-jsdoc': 0,
    'max-len': [
      1, {
        code: 120,
      },
    ],
    'no-console': 0,
    'new-cap': 0,
  },
};
