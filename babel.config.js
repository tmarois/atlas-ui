    module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }]
    ],
    plugins: [
      ['@babel/plugin-transform-typescript', { isTSX: true }]
    ]
  };
