import 'react-native-get-random-values';

import { Amplify } from 'aws-amplify';
import { confirmSignUp, fetchAuthSession, fetchUserAttributes, signIn, signOut, signUp } from 'aws-amplify/auth';

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

let pendingPassword: string | null = null;

export async function createAccount(
    email: string,
    password: string,
    name: string
) {
    pendingPassword = password;

    return await signUp({
        username: email,
        password,
        options: {
            userAttributes: {
                email,
                name,
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
    });
}

export async function login(
    email: string,
    password: string
) {
    return await signIn({
        username: email,
        password,
        options: {
            authFlowType: 'USER_PASSWORD_AUTH'
        }
    });
}

export async function completeLogin(email: string) {
    if (!pendingPassword) {
        throw new Error('No pending password to complete sign-in.');
    }

    const result = await login(email, pendingPassword);
    pendingPassword = null;

    return result;
}

export async function logout() {
    await signOut();
}

export async function getUserName(): Promise<string | undefined> {
    const attributes = await fetchUserAttributes();
    return attributes.name;
}

export async function getIdToken(): Promise<string> {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken;

    if (!idToken) {
        throw new Error('No active session found.');
    }

    return idToken.toString();
}
