import js from '@eslint/js'
import globals from 'globals'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**']
  },
  js.configs.recommended,
  {
    files: ['client/**/*.{js,jsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    }
  },
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ['server/**/*.ts']
  })),
  {
    files: ['server/**/*.ts'],
    extends: [eslintPluginPrettierRecommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }]
    }
  }
)
