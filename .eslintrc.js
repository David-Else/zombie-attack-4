module.exports = {
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    // "@typescript-eslint/prefer-readonly-parameter-types": "error",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/member-ordering": "error",
  },
};
