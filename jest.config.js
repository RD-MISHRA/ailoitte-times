const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  reporters: [
    'default', // Keep the default console reporter
    ['./node_modules/jest-html-reporter', {
      outputPath: './test-report.html', // Where to save the HTML file
      pageTitle: 'My Next.js Test Report', // Title for the HTML report
      includeFailureMsg: true, // Show detailed error messages for failures
      // Add other options as needed from the package's documentation
    }],
  ],
};

module.exports = createJestConfig(customJestConfig);