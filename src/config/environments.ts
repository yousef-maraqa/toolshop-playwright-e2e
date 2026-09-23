import dotenv from 'dotenv';

dotenv.config();

export const environments = {
  prod: {
    uiUrl: 'https://practicesoftwaretesting.com',
    apiUrl: 'https://api.practicesoftwaretesting.com',
  },
  'with-bugs': {
    uiUrl: 'https://with-bugs.practicesoftwaretesting.com',
    apiUrl: 'https://api-with-bugs.practicesoftwaretesting.com',
  },
  sprint4: {
    uiUrl: 'https://v4.practicesoftwaretesting.com',
    apiUrl: 'https://api-v4.practicesoftwaretesting.com',
  },
  local: {
    uiUrl: 'http://localhost:4200',
    apiUrl: 'http://localhost:8091',
  },
} as const;

export type EnvironmentName = keyof typeof environments;

const configuredEnvironment = process.env.ENV ?? 'prod';

if (!(configuredEnvironment in environments)) {
  throw new Error(
    `Unsupported ENV "${configuredEnvironment}". Expected one of: ${Object.keys(environments).join(', ')}`,
  );
}

export const environmentName = configuredEnvironment as EnvironmentName;
export const currentEnvironment = environments[environmentName];
