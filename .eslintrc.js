module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    quotes: ["error", "double"],
    // indent: ["error", 4],
    // "react/jsx-indent": ["error", 4],
    // "react/jsx-indent-props": ["error", 4],
    // "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    camelcase: "off",
    "no-shadow": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    // TODO: remove this
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-use-before-define": "off",
    "react/require-default-props": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
