import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  testTimeout: 60 * 1000,
  testEnvironment: 'node'
};
