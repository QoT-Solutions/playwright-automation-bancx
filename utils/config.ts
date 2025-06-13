import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
    baseUrl: string;
    timeout: number;
}

interface Credentials {
    validUser: {
        username: string;
        password: string;
    };
    invalidUser: {
        username: string;
        password: string;
    };
}

export class ConfigManager {
    private static config: Config;
    private static credentials: Credentials;

    static loadConfig(): Config {
        if (!this.config) {
            const configPath = path.join(process.cwd(), 'config', 'config.json');
            const configData = fs.readFileSync(configPath, 'utf8');
            this.config = JSON.parse(configData);
        }
        return this.config;
    }

    static loadCredentials(): Credentials {
        if (!this.credentials) {
            const credentialsPath = path.join(process.cwd(), 'config', 'credentials.json');
            const credentialsData = fs.readFileSync(credentialsPath, 'utf8');
            this.credentials = JSON.parse(credentialsData);
        }
        return this.credentials;
    }

    static getBaseUrl(): string {
        return this.loadConfig().baseUrl;
    }

    static getValidCredentials() {
        return this.loadCredentials().validUser;
    }

    static getInvalidCredentials() {
        return this.loadCredentials().invalidUser;
    }
}

export const config = {
    api: {
        baseUrl: process.env.API_BASE_URL || 'https://api.bancx.com',
        version: process.env.API_VERSION || '1.0'
    },
    oauth: {
        clientId: process.env.OAUTH_CLIENT_ID || 'default-client-id',
        clientSecret: process.env.OAUTH_CLIENT_SECRET || 'default-client-secret'
    },
    test: {
        username: process.env.TEST_USERNAME || 'test-user',
        password: process.env.TEST_PASSWORD || 'test-password'
    }
};

// Validate required environment variables
const requiredEnvVars = [
    'OAUTH_CLIENT_ID',
    'OAUTH_CLIENT_SECRET'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.warn(`Warning: ${envVar} is not set in environment variables`);
    }
} 