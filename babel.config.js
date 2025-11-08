module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: '.',
          alias: {
            test: './test',
            underscore: 'lodash',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@domain': './src/domain',
            '@brand': './src/brand',
            '@api': './src/api',
            '@types': './src/types',
            '@utils': './src/utils',
            '@infra': './src/infra',
            '@service': './src/service',
            '@test': './src/test',
            '@assets': './src/assets',
          },
        },
      ],
    ],
  };
};
