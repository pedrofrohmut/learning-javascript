import type { Config } from "jest"

const config: Config = {
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    // The test environment that will be used for testing
    // testEnvironment: "jest-environment-node",
    testEnvironment: "node",

    // A map from regular expressions to paths to transformers
    // transform: undefined,
    transform: { "^.+.tsx?$": ["ts-jest", {}] }
}

export default config
