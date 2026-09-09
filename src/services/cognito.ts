import { Amplify } from 'aws-amplify';
import { confirmSignUp, signUp } from 'aws-amplify/auth';

import { env } from '../constants/env';

const userPoolId = env.cognitoUserPoolId;
const userPoolClientId = env.cognitoClientId;

if (!userPoolId || !userPoolClientId) {
    throw new Error('Missing Cognito environment variables');
}

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId,
            userPoolClientId,
        },
    },
});

export async function createAccount(
    email: string,
    password: string
) {
    return await signUp({
        username: email,
        password, 
        options: {
            userAttributes: {
                email,
            },
        },
    });
}

export async function confirmAccount(
    email: string,
    code: string
) {
    return await confirmSignUp({
        username: email,
        confirmationCode: code
    })
}
