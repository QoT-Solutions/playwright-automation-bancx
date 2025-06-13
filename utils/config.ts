import * as fs from 'fs';
import * as path from 'path';

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