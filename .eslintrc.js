module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "airbnb"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "eol-last": ["error", "always"],
        "linebreak-style": ["error", "windows"],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "no-use-before-define": ["error", { "functions": false}],
        "import/prefer-default-export": "off",
        "no-sequences": ["error", { "allowInParentheses": true }],
        "no-param-reassign": ["error", { "props": false }]
    }
}
