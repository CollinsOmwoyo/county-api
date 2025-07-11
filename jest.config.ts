import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
preset: 'ts-jest',
testEnvironment: 'node',
moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
}),
moduleFileExtensions: ['ts', 'js', 'json'],
rootDir: './',
testMatch: ['**/*.spec.ts'],
transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
},
};
