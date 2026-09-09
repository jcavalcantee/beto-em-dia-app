export const env = {
    awsRegion: process.env.EXPO_PUBLIC_AWS_REGION, 
    cognitoUserPoolId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID,
    cognitoClientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID
} as const;