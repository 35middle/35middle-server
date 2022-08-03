module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleDirectories: ["node_modules"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/modules/**/*.ts",
    "!src/**/*.{entity,dto,provider,schema,error,d}.ts",
    "!src/**/{index,app,server,constants}.ts"
  ]
}
