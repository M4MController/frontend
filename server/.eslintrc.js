module.exports = {
  env: {
    node: true,
  },
  root: true,
  extends: ['eslint:recommended', 'google'],
  rules: {
    'require-jsdoc': 0,
    'max-len': [
      1, {
        code: 120,
      },
    ],
  },
};
