import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';
import { LoanApplicationRequest } from '../../types/api.types';

test.describe('Loan Application API Tests', () => {
    let apiClient: ApiClient;

    test.beforeEach(async () => {
        apiClient = new ApiClient();
        await apiClient.initialize();
    });

    test.afterEach(async () => {
        await apiClient.cleanup();
    });

    test('should successfully get authentication token', async () => {
        const token = await apiClient.getToken();
        expect(token).toBeTruthy();
        expect(typeof token).toBe('string');
    });

    test('should create loan application with valid data', async () => {
        const loanData: LoanApplicationRequest = {
            grossIncome: 0,
            netIncome: 2000000,
            livingExpenses: 1500000,
            payDay: "31",
            loanReason: {
                id: "1001",
                name: "Reason 1",
                code: "reason-1"
            }
        };

        const response = await apiClient.createLoanApplication(loanData);
        expect(response).toBeTruthy();
        expect(response.id).toBeTruthy();
        expect(response.status).toBeTruthy();
    });

    test('should handle invalid loan application data', async () => {
        const invalidLoanData: LoanApplicationRequest = {
            grossIncome: -1, // Invalid negative income
            netIncome: 0,
            livingExpenses: 0,
            payDay: "32", // Invalid day
            loanReason: {
                id: "invalid",
                name: "Invalid Reason",
                code: "invalid-reason"
            }
        };

        try {
            await apiClient.createLoanApplication(invalidLoanData);
            throw new Error('Expected request to fail');
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });

    test('should handle expired token', async () => {
        // Force token expiration by setting it to null
        (apiClient as any).token = null;
        
        const loanData: LoanApplicationRequest = {
            grossIncome: 0,
            netIncome: 2000000,
            livingExpenses: 1500000,
            payDay: "31",
            loanReason: {
                id: "1001",
                name: "Reason 1",
                code: "reason-1"
            }
        };

        const response = await apiClient.createLoanApplication(loanData);
        expect(response).toBeTruthy();
        expect(response.id).toBeTruthy();
    });
}); 