export interface TokenRequest {
    grant_type: string;
    client_id: string;
    username: string;
    password: string;
    override: boolean;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface LoanApplicationRequest {
    income: number;
    expenses: number;
    payDay: number;
    loanAmount: number;
    term: number;
}

export interface LoanApplicationResponse {
    status: number;
    data: {
        applicationId: string;
        status: string;
        error?: string;
    };
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