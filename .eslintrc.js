module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        "project": ["tsconfig.json"]
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint/eslint-plugin',
    ],
    rules: {
        semi: ['error', 'never'],
        '@typescript-eslint/semi': ['error', 'never'],
        'linebreak-style': ['off'],
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}]
    },
}
