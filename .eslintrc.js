module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    'consistent-return': 'off',
    'no-console': [2, { allow: ['warn', 'error', 'log'] }],
    'func-names': [2, 'never'],
    camelcase: 'off',
    'arrow-parens': [2, 'as-needed'],
    'one-var': [2, 'consecutive'],
  },
};
