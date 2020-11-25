module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        // the below option is because we use import/export syntax in node too
        sourceType: 'module',
        ecmaVersion: 11,
    },
    rules: {
        semi: 0,
        'linebreak-style': 0,
        'no-console': 0,
        indent: 0,
    },
}
