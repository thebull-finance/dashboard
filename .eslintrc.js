module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    document: false,
    escape: false,
    navigator: false,
    unescape: false,
    window: false,
    describe: true,
    before: true,
    it: true,
    expect: true,
    sinon: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "formatjs"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
  ],
  rules: {
    "formatjs/no-offset": "error",
    "formatjs/no-multiple-whitespaces": "error",
    "react/boolean-prop-naming": 2,
    "react/button-has-type": 2,
    "react/default-props-match-prop-types": 2,
    "react/destructuring-assignment": 0,
    "react/display-name": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/forbid-component-props": 0,
    "react/forbid-dom-props": 2,
    "react/forbid-elements": 2,
    "react/forbid-foreign-prop-types": 2,
    "react/forbid-prop-types": 0,
    "react/jsx-boolean-value": [0, "always"],
    "react/jsx-curly-brace-presence": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-first-prop-new-line": 2,
    "react/jsx-fragments": 2,
    "react/jsx-handler-names": 0,
    "react/jsx-key": 2,
    "react/jsx-max-depth": [
      2,
      {
        max: 9,
      },
    ],
    "react/jsx-no-bind": 0,
    "react/jsx-no-comment-textnodes": 2,
    "react/jsx-no-target-blank": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-pascal-case": 0,
    "react/jsx-sort-default-props": 2,
    "react/jsx-sort-props": 1,
    "react/jsx-uses-react": 2,
    "react/jsx-wrap-multilines": 2,
    "react/no-access-state-in-setstate": 2,
    "react/no-array-index-key": 0,
    "react/no-children-prop": 2,
    "react/no-danger": 0,
    "react/no-danger-with-children": 2,
    "react/no-deprecated": 2,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 2,
    "react/no-find-dom-node": 1,
    "react/no-is-mounted": 2,
    "react/no-multi-comp": 0,
    "react/no-redundant-should-component-update": 2,
    "react/no-render-return-value": 2,
    "react/no-set-state": 0,
    "react/no-string-refs": 1,
    "react/no-this-in-sfc": 2,
    "react/no-typos": 2,
    "react/no-unescaped-entities": 0,
    "react/no-unknown-property": 2,
    "react/no-unsafe": 2,
    "react/no-unused-prop-types": 2,
    "react/no-unused-state": 2,
    "react/no-will-update-set-state": 1,
    "react/prefer-es6-class": 2,
    "react/prefer-read-only-props": 0,
    "react/prefer-stateless-function": 2,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 2,
    "react/require-default-props": 2,
    "react/require-render-return": 2,
    "react/self-closing-comp": 2,
    "react/sort-comp": 2,
    "react/sort-prop-types": 2,
    "react/style-prop-object": 2,
    "react/void-dom-elements-no-children": 2,
    "block-scoped-var": 2,
    "brace-style": [
      2,
      "1tbs",
      {
        allowSingleLine: true,
      },
    ],
    camelcase: [
      1,
      {
        properties: "always",
      },
    ],
    "comma-dangle": [0, "always"],
    "comma-spacing": [
      2,
      {
        before: false,
        after: true,
      },
    ],
    "comma-style": [2, "last"],
    complexity: 0,
    "consistent-return": 1,
    "consistent-this": 2,
    curly: [2, "multi-line"],
    "default-case": 2,
    "dot-location": [2, "property"],
    "dot-notation": 2,
    "eol-last": 2,
    eqeqeq: [2, "allow-null"],
    "func-names": 2,
    "func-style": 0,
    "generator-star-spacing": [2, "both"],
    "guard-for-in": 2,
    "handle-callback-err": [2, "^(err|error|anySpecificError)$"],
    indent: 0,
    "key-spacing": [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "keyword-spacing": [
      2,
      {
        before: true,
        after: true,
      },
    ],
    "linebreak-style": 2,
    "max-depth": 1,
    "max-len": [0, 100, 2],
    "max-nested-callbacks": 2,
    "max-params": [
      1,
      {
        max: 4,
      },
    ],
    "max-statements": 0,
    "new-cap": [
      2,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    "new-parens": 2,
    "newline-after-var": [0, "never"],
    "no-alert": 0,
    "no-array-constructor": 2,
    "no-bitwise": 2,
    "no-caller": 2,
    "no-catch-shadow": 2,
    "no-cond-assign": 2,
    "no-console": 2,
    "no-constant-condition": 1,
    "no-continue": 2,
    "no-control-regex": 2,
    "no-debugger": 2,
    "no-delete-var": 2,
    "no-div-regex": 2,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-else-return": 2,
    "no-empty": 1,
    "no-empty-character-class": 2,
    "no-eq-null": 1,
    "no-eval": 2,
    "no-ex-assign": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": 0,
    "no-extra-semi": 2,
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-func-assign": 2,
    "no-implied-eval": 2,
    "no-inline-comments": 0,
    "no-inner-declarations": [2, "functions"],
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-iterator": 2,
    "no-label-var": 2,
    "no-labels": 2,
    "no-lone-blocks": 2,
    "no-lonely-if": 2,
    "no-loop-func": 1,
    "no-mixed-requires": 2,
    "no-mixed-spaces-and-tabs": [2, false],
    "no-multi-spaces": 2,
    "no-multi-str": 1,
    "no-multiple-empty-lines": [
      2,
      {
        max: 1,
      },
    ],
    "no-native-reassign": 2,
    "no-negated-in-lhs": 2,
    "no-nested-ternary": 0,
    "no-new": 2,
    "no-new-func": 2,
    "no-new-object": 2,
    "no-new-require": 2,
    "no-new-wrappers": 2,
    "no-obj-calls": 2,
    "no-octal": 2,
    "no-octal-escape": 2,
    "no-path-concat": 2,
    "no-plusplus": 0,
    "no-process-env": 0,
    "no-process-exit": 2,
    "no-proto": 2,
    "no-redeclare": 2,
    "no-regex-spaces": 2,
    "no-restricted-modules": 2,
    "no-return-assign": 2,
    "no-script-url": 2,
    "no-self-compare": 2,
    "no-sequences": 1,
    "no-shadow": 2,
    "no-shadow-restricted-names": 2,
    "no-spaced-func": 2,
    "no-sparse-arrays": 2,
    "no-sync": 1,
    "no-ternary": 0,
    "no-throw-literal": 2,
    "no-trailing-spaces": 2,
    "no-undef": 2,
    "no-undef-init": 2,
    "no-undefined": 0,
    "no-underscore-dangle": 0,
    "no-unneeded-ternary": 2,
    "no-unreachable": 2,
    "no-unused-expressions": 2,
    "no-unused-vars": [
      2,
      {
        vars: "all",
        varsIgnorePattern: "([Rr]eact|Provider|App|CssBaseline)",
        args: "after-used",
      },
    ],
    "no-use-before-define": 0,
    "no-var": 2,
    "no-void": 0,
    "no-warning-comments": 0,
    "no-with": 2,
    "object-curly-spacing": 0,
    "one-var": [2, "never"],
    "operator-assignment": 2,
    "operator-linebreak": [0, "before"],
    "padded-blocks": [2, "never"],
    "quote-props": 0,
    quotes: [2, "double", "avoid-escape"],
    radix: 0,
    semi: [2, "always"],
    "semi-spacing": 2,
    "sort-vars": 1,
    "space-before-blocks": [2, "always"],
    "space-before-function-paren": [
      2,
      {
        anonymous: "always",
        named: "never",
      },
    ],
    "space-in-parens": [2, "never"],
    "space-infix-ops": 2,
    "space-unary-ops": [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    "spaced-comment": [
      "error",
      "always",
      {
        markers: ["/"],
      },
    ],
    strict: 2,
    "use-isnan": 2,
    "valid-jsdoc": 2,
    "valid-typeof": 2,
    "vars-on-top": 2,
    "wrap-iife": [2, "any"],
    "wrap-regex": 2,
    yoda: [2, "never"],
  },
};