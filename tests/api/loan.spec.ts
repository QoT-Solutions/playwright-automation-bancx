import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';
import { LoanApplicationRequest, TokenResponse, LoanApplicationResponse } from '../../types/api.types';

test.describe('Loan Application API Tests', () => {
    let apiClient: ApiClient;
    let sharedToken: string;

    // Decision table test cases for loan applications
    const loanTestCases = [
        {
            name: 'Valid loan application with minimum values',
            data: {
                grossIncome: 0,
                netIncome: 2000000,
                livingExpenses: 1500000,
                payDay: "31",
                loanReason: {
                    id: "1001",
                    name: "Reason 1",
                    code: "reason-1"
                }
            },
            expectedStatus: 201,
            shouldSucceed: true
        },
        {
            name: 'Valid loan application with maximum values',
            data: {
                grossIncome: 5000000,
                netIncome: 4000000,
                livingExpenses: 2000000,
                payDay: "25",
                loanReason: {
                    id: "1002",
                    name: "Reason 2",
                    code: "reason-2"
                }
            },
            expectedStatus: 201,
            shouldSucceed: true
        },
        {
            name: 'Invalid loan application - negative income',
            data: {
                grossIncome: -1,
                netIncome: -1000,
                livingExpenses: 1500000,
                payDay: "31",
                loanReason: {
                    id: "1001",
                    name: "Reason 1",
                    code: "reason-1"
                }
            },
            expectedStatus: 400,
            shouldSucceed: false
        },
        {
            name: 'Invalid loan application - expenses greater than income',
            data: {
                grossIncome: 1000000,
                netIncome: 800000,
                livingExpenses: 1000000,
                payDay: "31",
                loanReason: {
                    id: "1001",
                    name: "Reason 1",
                    code: "reason-1"
                }
            },
            expectedStatus: 400,
            shouldSucceed: false
        },
        {
            name: 'Invalid loan application - invalid pay day',
            data: {
                grossIncome: 2000000,
                netIncome: 1800000,
                livingExpenses: 1000000,
                payDay: "32",
                loanReason: {
                    id: "1001",
                    name: "Reason 1",
                    code: "reason-1"
                }
            },
            expectedStatus: 400,
            shouldSucceed: false
        }
    ];

    test.beforeAll(async () => {
        apiClient = new ApiClient();
        await apiClient.initialize();
    });

    test.beforeEach(async () => {
        // Get fresh token before each test
        const tokenResponse = await apiClient.getToken() as TokenResponse;
        sharedToken = tokenResponse.access_token;
        
        // Log token request details
        await test.info().attach('Token Request', {
            body: JSON.stringify({
                client_id: 'account-number',
                client_secret: 'f167b312-c76b-40da-adfe-c6d01a1a695c',
                grant_type: 'client_credentials'
            }, null, 2),
            contentType: 'application/json'
        });
        
        await test.info().attach('Token Response', {
            body: JSON.stringify(tokenResponse, null, 2),
            contentType: 'application/json'
        });
        
        apiClient.token = sharedToken;
    });

    test('should successfully create a loan application with valid data', async () => {
        const loanRequest: LoanApplicationRequest = {
            income: 50000,
            expenses: 20000,
            payDay: 25,
            loanAmount: 15000,
            term: 12
        };

        // Log request payload
        await test.info().attach('Loan Application Request', {
            body: JSON.stringify(loanRequest, null, 2),
            contentType: 'application/json'
        });

        const response = await apiClient.createLoanApplication(loanRequest) as LoanApplicationResponse;

        // Log response
        await test.info().attach('Loan Application Response', {
            body: JSON.stringify(response, null, 2),
            contentType: 'application/json'
        });

        // Assertions
        expect(response.status).toBe(200);
        expect(response.data.applicationId).toBeTruthy();
        expect(response.data.status).toBe('PENDING');
    });

    test('should reject loan application when expenses exceed income', async () => {
        const loanRequest: LoanApplicationRequest = {
            income: 30000,
            expenses: 35000,
            payDay: 25,
            loanAmount: 15000,
            term: 12
        };

        // Log request payload
        await test.info().attach('Loan Application Request', {
            body: JSON.stringify(loanRequest, null, 2),
            contentType: 'application/json'
        });

        const response = await apiClient.createLoanApplication(loanRequest) as LoanApplicationResponse;

        // Log response
        await test.info().attach('Loan Application Response', {
            body: JSON.stringify(response, null, 2),
            contentType: 'application/json'
        });

        expect(response.status).toBe(400);
        expect(response.data.error).toContain('Expenses cannot exceed income');
    });

    test.afterAll(async () => {
        await apiClient.cleanup();
    });

    // Run decision table test cases
    for (const testCase of loanTestCases) {
        test(`Loan Application - ${testCase.name}`, async ({ page }, testInfo) => {
            if (testCase.shouldSucceed) {
                const response = await apiClient.createLoanApplication(testCase.data);
                
                // Log request details
                await testInfo.attach('request', {
                    body: JSON.stringify(testCase.data, null, 2),
                    contentType: 'application/json'
                });

                // Log response details
                await testInfo.attach('response', {
                    body: JSON.stringify(response, null, 2),
                    contentType: 'application/json'
                });

                expect(response).toBeTruthy();
                expect(response.id).toBeTruthy();
                expect(response.status).toBeTruthy();
            } else {
                await expect(async () => {
                    await apiClient.createLoanApplication(testCase.data);
                }).rejects.toThrow();
            }
        });
    }

    test('should handle expired token by auto-refreshing', async ({ page }, testInfo) => {
        const loanData: LoanApplicationRequest = {
            grossIncome: 3000000,
            netIncome: 2500000,
            livingExpenses: 1000000,
            payDay: "15",
            loanReason: {
                id: "1003",
                name: "Reason 3",
                code: "reason-3"
            }
        };

        // Force token expiration
        apiClient.token = null;

        // Log request details
        await testInfo.attach('request', {
            body: JSON.stringify(loanData, null, 2),
            contentType: 'application/json'
        });

        const response = await apiClient.createLoanApplication(loanData);
        
        // Log response details
        await testInfo.attach('response', {
            body: JSON.stringify(response, null, 2),
            contentType: 'application/json'
        });

        expect(response).toBeTruthy();
        expect(response.id).toBeTruthy();
    });
}); 