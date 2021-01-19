const isTest = String(process.env.NODE_ENV) === 'test';
module.exports = isTest ?
{
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    'dynamic-import-node'],
} : {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          browsers: [
            'Chrome >= 52',
            'FireFox >= 44',
            'Safari >= 7',
            'Explorer 11',
            'last 4 Edge versions',
          ],
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        regenerator: true,
      },
    ],
    '@babel/plugin-proposal-class-properties',
  ],
};
