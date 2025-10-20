import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
// import SemiWebpackPlugin from '@douyinfe/semi-webpack-plugin';
const SemiWebpackPlugin = require('@douyinfe/semi-webpack-plugin').default;
export default defineConfig({
  plugins: [pluginReact(),pluginLess()
  ],
  tools: {
    rspack: {
      plugins: [new SemiWebpackPlugin({
        theme: {
          name: '@semi-bot/semi-theme-doucreator',
        },
        include: '~@semi-bot/semi-theme-doucreator/scss/local.scss',
          extract: true

      })],
    },
  },
});
