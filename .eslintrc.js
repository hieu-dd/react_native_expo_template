module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Sử dụng parser cho TypeScript
  plugins: [
    '@typescript-eslint',
    'react-native',
    'prettier', // Để tích hợp Prettier vào ESLint
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Quy tắc cho TypeScript
    'plugin:react-native/all', // Quy tắc dành cho React Native
    'plugin:prettier/recommended', // Chạy Prettier như một rule ESLint và vô hiệu hóa các quy tắc xung đột
  ],
  parserOptions: {
    ecmaVersion: 2020, // Hỗ trợ các tính năng mới của JavaScript
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Cho phép sử dụng JSX
    },
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    // Thiết lập rule cho Prettier (chỉ cần định nghĩa nếu muốn ghi đè một số thiết lập)
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        tabWidth: 2,
      },
    ],
    // Ví dụ tắt rule không cần thiết:
    'react-native/no-inline-styles': 'off',
    'react/react-in-jsx-scope': 'off', // Không cần thiết với React Native (vì không cần import React mỗi file)
  },
  settings: {
    react: {
      version: 'detect', // Tự động xác định phiên bản React
    },
  },
};
