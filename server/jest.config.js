/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Указываем, где искать файлы с тестами
  testMatch: ['**/tests/**/*.test.ts'], 
};