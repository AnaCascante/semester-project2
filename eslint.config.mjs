import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config} */
export default {
  // Specifies JavaScript environment options (like browser global variables)
  languageOptions: {
    globals: globals.browser, // Adds browser-specific globals
    ecmaVersion: 'latest', // Ensures compatibility with the latest ECMAScript features
    sourceType: 'module', // Enables ES6 module syntax (import/export)
  },
  // Extends recommended JavaScript linting rules
  extends: [
    'eslint:recommended',
    pluginJs.configs.recommended, // Adds recommended JS rules from the @eslint/js plugin
  ],
  rules: {
    // Add any project-specific rules here, e.g.:
    'no-unused-vars': 'warn', // Warns about unused variables
    'no-console': 'off', // Allows console logs
  },
}
