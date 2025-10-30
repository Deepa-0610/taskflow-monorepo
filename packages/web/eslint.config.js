const nextPlugin = require("@next/eslint-plugin-next");

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: nextPlugin.configs.recommended.rules,
  },
];