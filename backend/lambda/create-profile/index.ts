import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import type {
    APIGatewayProxyEventV2WithJWTAuthorizer,
    APIGatewayProxyResultV2,
} from "aws-lambda";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME ?? "";

interface ProfileRequest {
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

const validateInput = (body: ProfileRequest): boolean => {
    if (
        !body.name?.trim() ||
        !body.diagnosisTime?.trim() ||
        !body.treatmentType?.trim() ||
        !body.basalInsulin?.trim()
    ) {
        return false;
    }

    if (
        !Number.isFinite(body.insulinCarboRatio) ||
        !Number.isFinite(body.insulinSensitivity) ||
        !Number.isFinite(body.age) ||
        !Number.isFinite(body.carboDayGoal) ||
        !Number.isFinite(body.targetGlucose)
    ) {
        return false;
    }

    return true;
};

export const handler = async (
    event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
    try {
        console.log("Received event: ", JSON.stringify(event));

        const sub = event.requestContext.authorizer.jwt.claims.sub;

        if (!sub || typeof sub !== "string") {
            return {
                statusCode: 401,
                body: JSON.stringify({
                    message: "Unauthorized."
                })
            };
        }

        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Request body is not sent."
                })
            };
        }

        const body: ProfileRequest = JSON.parse(event.body);

        if (!validateInput(body)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Invalid request data."
                })
            }
        }

        const now = new Date().toISOString();

        await dynamo.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    PK: `USER#${sub}`,
                    SK: "PROFILE",
                    ...body,
                    createdAt: now,
                    updatedAt: now
                }
            })
        );

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Profile created successfully."
            })
        };
    } catch (error) {
        console.error("Unexpected error: ", error)

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal server error."
            })
        };
    }
};

