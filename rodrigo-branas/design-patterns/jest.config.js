const config = {
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    // The test environment that will be used for testing
    testEnvironment: "node",

    // A map from regular expressions to paths to transformers
    transform: { "^.+.tsx?$": ["ts-jest", {}] }
}

module.exports = config
