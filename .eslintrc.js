module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 11,
  },
  'rules': {
    'semi': 0,
    'space-before-function-paren': 0,
    'object-curly-spacing': 0,
    'no-multi-spaces': 0,
    'no-multiple-empty-lines': 0,
    'comma-dangle': 0,
    'valid-jsdoc': 0,
    'max-len': 0,
    'eol-last': 0,
    'func-call-spacing': 0,
    'padded-blocks': 0,
    'arrow-parens': 0,
    'no-invalid-this': 0,
    'no-trailing-spaces': 0,
    'require-jsdoc': 0,
    'indent': [
      'error',
      2,
      {'SwitchCase': 1}
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'no-var': 'error'
  }
};