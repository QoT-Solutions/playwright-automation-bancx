import axios, { AxiosInstance } from 'axios';
import { TokenResponse, LoanApplicationRequest, LoanApplicationResponse } from '../types/api.types';
import { config } from './config';

export class ApiClient {
    private axiosInstance: AxiosInstance;
    private _token: string = '';

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: config.api.baseUrl,
            timeout: 10000,
            headers: {
                'api-version': config.api.version
            }
        });
    }

    set token(value: string) {
        this._token = value;
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${value}`;
    }

    async initialize(): Promise<void> {
        // Any initialization logic if needed
    }

    async getToken(): Promise<TokenResponse> {
        const response = await this.axiosInstance.post('/oauth/token', {
            client_id: config.oauth.clientId,
            client_secret: config.oauth.clientSecret,
            grant_type: 'client_credentials'
        });
        
        return response.data;
    }

    async createLoanApplication(request: LoanApplicationRequest): Promise<LoanApplicationResponse> {
        const response = await this.axiosInstance.post('/loans/applications', request);
        return {
            status: response.status,
            data: response.data
        };
    }

    async cleanup(): Promise<void> {
        // Any cleanup logic if needed
    }
} 