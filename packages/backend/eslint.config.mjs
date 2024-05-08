/* import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]; */

// eslint.config.mjs в подпроекте
import baseConfig from "../../eslint.config.mjs"; // Путь к корневому конфигу

export default {
  ...baseConfig,
  extends: [
    ...baseConfig.extends,
    // Дополнительные расширения специфичные для подпроекта
  ],
  rules: {
    ...baseConfig.rules,
    // Переопределения или дополнительные правила для подпроекта
  },
};
