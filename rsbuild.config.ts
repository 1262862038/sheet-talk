import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
// import SemiWebpackPlugin from '@douyinfe/semi-webpack-plugin';
const SemiWebpackPlugin = require('@douyinfe/semi-webpack-plugin').default;
export default defineConfig({
  plugins: [pluginReact(),pluginLess()
  ],
    source: {

        entry: {
            index: './src/index.tsx',
        },
    },
  tools: {
     htmlPlugin: (config, { entryName }) => {
            // 根据 entryName 返回不同的配置
            const htmlConfigs: Record<string, any> = {
                index: {
                    template: './public/index.html',
                    filename: 'index.html',
                    chunks: ['index'],
                },

            };

            return {
                ...config,
                ...htmlConfigs[entryName],
            };
        },
  },
});
