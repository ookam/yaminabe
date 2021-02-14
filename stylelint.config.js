module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "block-opening-brace-space-before": 'never',
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "declaration-empty-line-before": "never",
    "indentation": [
      4,
      {
        "message": "インデントは 4 文字の半角スペースを利用して下さい",
        "severity": "error"
      }
    ],
  },
};
