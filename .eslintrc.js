module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // 上から順にルールが適用（上書き）されていく
    // 個別のルールは`.prettierrc.js`に書く
    "eslint:recommended",
    "plugin:vue/recommended",
    "prettier",
    "prettier/vue",
  ],
  plugins: ["vue"],
  rules: {},
};
