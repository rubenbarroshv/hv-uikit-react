module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}",
    "!core/*"
  ],
  coverageThreshold: {
    global: {
      branches: 91,
      functions: 98,
      lines: 98
    }
  },
  coverageReporters: ["json", "lcov", "text-summary"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    ".*\\.(css|less|styl|scss|sass)$":
      "<rootDir>/config/jest-mocks/cssModule.js",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/jest-mocks/image.js"
  },
  setupTestFrameworkScriptFile: "<rootDir>/config/test-setup.js",
  testRegex: "src/.*\\.test\\.(js|jsx)$",
  rootDir: "../",
  testURL: "http://localhost/"
};
