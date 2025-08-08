/**
 * Environment configuration module
 * Centralizes access to environment variables with validation
 */

interface EnvConfig {
  mapgl: {
    apiKey: string;
  };
  app: {
    url: string;
    env: 'development' | 'production' | 'test';
    testHooksEnabled: boolean;
  };
}

class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

/**
 * Validates that required environment variables are present
 * @throws {ConfigError} if required variables are missing
 */
function validateEnv(): void {
  const required = ['NEXT_PUBLIC_2GIS_API_KEY'];
  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new ConfigError(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please check your .env.local file and ensure all required variables are set.\n` +
      `Refer to .env.example for the template.`
    );
  }
}

/**
 * Get the 2GIS MapGL API key
 * @returns {string} The API key
 * @throws {ConfigError} if the API key is not set
 */
export function getMapGLApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_2GIS_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new ConfigError(
      '2GIS MapGL API key is not configured properly.\n' +
      'Please set NEXT_PUBLIC_2GIS_API_KEY in your .env.local file.\n' +
      'You can get an API key from: https://docs.2gis.com/en/mapgl/overview#how-to-get-an-api-key'
    );
  }
  
  return apiKey;
}

/**
 * Get the application environment
 * @returns {'development' | 'production' | 'test'} The current environment
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  const env = process.env.NODE_ENV;
  
  if (env === 'production' || env === 'development' || env === 'test') {
    return env;
  }
  
  return 'development';
}

/**
 * Get the application URL
 * @returns {string} The application URL
 */
export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 
         (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
}

/**
 * Determine whether E2E test hooks are enabled
 * Controlled via NEXT_PUBLIC_ENABLE_TEST_HOOKS. Intended for test instrumentation only.
 * @returns {boolean} True when test hooks are explicitly enabled
 */
export function isTestHooksEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_TEST_HOOKS === 'true';
}

/**
 * Main configuration object
 * Access this for all environment-based configuration
 */
export const config: EnvConfig = {
  mapgl: {
    get apiKey() {
      return getMapGLApiKey();
    }
  },
  app: {
    get url() {
      return getAppUrl();
    },
    get env() {
      return getEnvironment();
    },
    /**
     * Whether E2E test hooks are enabled
     */
    get testHooksEnabled() {
      return isTestHooksEnabled();
    }
  }
};

/**
 * Validate environment on module load in development
 * This helps catch configuration issues early
 */
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  try {
    validateEnv();
  } catch (error) {
    console.error('⚠️  Environment Configuration Error:', error);
  }
}

export { ConfigError };