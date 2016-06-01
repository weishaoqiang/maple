module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "models": true,
    "config": true
  },
  "extends": "eslint:recommended",
  "installedESLint": true,
  "parserOptions": {
    "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
        2,
        2,
        { "SwitchCase": 1 }
    ],
    "linebreak-style": [
        2,
        "unix"
    ],
    "quotes": [
        2,
        "single"
    ],
    "semi": [
        2,
        "never"
    ]
  }
};
