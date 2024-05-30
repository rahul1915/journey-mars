module.exports = {
    trailingComma: 'es5',
    printWidth: 120,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    quoteProps: 'consistent',
    overrides: [
        {
            files: '*.js',
            options: {
                parser: 'flow',
            },
        },
        {
            files: '.*rc',
            options: { parser: 'json' },
        },
    ],
};
