import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    ignores: ['.next', 'node_modules'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]