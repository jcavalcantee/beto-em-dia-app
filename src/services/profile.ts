import { env } from '../constants/env';

export interface ProfileData {
    name: string;
    age: number;
    diagnosisTime: string;
    treatmentType: string;
    carboDayGoal: number;
    insulinCarboRatio: number;
    insulinSensitivity: number;
    targetGlucose: number;
    basalInsulin: string;
}

export async function createProfile(idToken: string, profile: ProfileData) {
    const response = await fetch(`${env.apiUrl}profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(profile),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? 'Failed to create profile.');
    }

    return response.json();
}
