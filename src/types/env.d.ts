/// <reference types="node" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  interface ProcessEnv {
    // 2GIS MapGL Configuration
    NEXT_PUBLIC_2GIS_API_KEY: string;
    
    // Application Configuration (optional)
    NEXT_PUBLIC_APP_URL?: string;
    
    // Test instrumentation flag (optional; defaults to false)
    NEXT_PUBLIC_ENABLE_TEST_HOOKS?: 'true' | 'false';
    
    // Node Environment
    NODE_ENV: 'development' | 'production' | 'test';
    
    // Add other environment variables as needed
  }
}

// Ensure this file is treated as a module
export {};