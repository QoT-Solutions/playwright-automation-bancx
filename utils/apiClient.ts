import { APIRequestContext, request } from '@playwright/test';
import { ApiConfig, TokenRequest, TokenResponse, LoanApplicationRequest, LoanApplicationResponse } from '../types/api.types';
import * as fs from 'fs';
import * as path from 'path';

export class ApiClient {
    private context: APIRequestContext;
    private config: ApiConfig;
    private token: string | null = null;

    constructor() {
        this.loadConfig();
    }

    private loadConfig() {
        const configPath = path.join(process.cwd(), 'config', 'api.config.json');
        const configData = fs.readFileSync(configPath, 'utf8');
        this.config = JSON.parse(configData);
    }

    async initialize() {
        this.context = await request.newContext({
            baseURL: this.config.baseUrls.api,
            extraHTTPHeaders: {
                'Content-Type': this.config.headers.contentType,
                'version': this.config.headers.apiVersion,
                'Ocp-Apim-Subscription-Key': this.config.headers.subscriptionKey
            }
        });
    }

    async getToken(): Promise<string> {
        if (this.token) return this.token;

        const tokenContext = await request.newContext({
            baseURL: this.config.baseUrls.sso
        });

        const tokenRequest = {
            grant_type: 'password',
            client_id: 'account-number',
            username: this.config.credentials.username,
            password: this.config.credentials.password,
            override: true
        };

        const response = await tokenContext.post(this.config.endpoints.token, {
            headers: {
                'Content-Type': this.config.headers.contentType,
                'Authorization': this.config.headers.authorization
            },
            form: tokenRequest
        });

        const tokenResponse: TokenResponse = await response.json();
        this.token = tokenResponse.access_token;
        return this.token;
    }

    async createLoanApplication(loanData: LoanApplicationRequest): Promise<LoanApplicationResponse> {
        const token = await this.getToken();
        const endpoint = this.config.endpoints.loanApplication.replace('{customerId}', this.config.testData.customerId);

        const response = await this.context.post(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: loanData
        });

        return response.json();
    }

    async cleanup() {
        if (this.context) {
            await this.context.dispose();
        }
    }
} 