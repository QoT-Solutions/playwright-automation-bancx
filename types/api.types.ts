export interface TokenRequest {
    grant_type: string;
    client_id: string;
    username: string;
    password: string;
    override: boolean;
}

export interface TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    session_state: string;
    scope: string;
}

export interface LoanApplicationRequest {
    grossIncome: number;
    netIncome: number;
    livingExpenses: number;
    payDay: string;
    loanReason: {
        id: string;
        name: string;
        code: string;
    };
}

export interface LoanApplicationResponse {
    id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    // Add other response fields as needed
}

export interface ApiConfig {
    baseUrls: {
        sso: string;
        api: string;
    };
    endpoints: {
        token: string;
        loanApplication: string;
    };
    headers: {
        contentType: string;
        authorization: string;
        apiVersion: string;
        subscriptionKey: string;
    };
    credentials: {
        username: string;
        password: string;
    };
    testData: {
        customerId: string;
        loanApplication: LoanApplicationRequest;
    };
} 