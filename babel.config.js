module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin', {
        relativeSourceLocation: true,
      }
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '^~(.+)': './src/\\1',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ]
      }
    ]
  ]
};
