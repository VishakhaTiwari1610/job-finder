import "dotenv/config";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const sqsRegion = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "ap-southeast-2";
const queueUrl = process.env.AWS_SQS_QUEUE_URL;

const sqsClient = new SQSClient({
    region: sqsRegion
});

console.log("[log-pipeline] SQS config", {
    region: sqsRegion,
    queueConfigured: Boolean(queueUrl),
    accessKeyConfigured: Boolean(process.env.AWS_ACCESS_KEY_ID),
    secretKeyConfigured: Boolean(process.env.AWS_SECRET_ACCESS_KEY)
});

const writeToFallbackFile = async (logEntry) => {
    try {
        const fallbackPath = path.join(process.cwd(), "logs", "fallback.log");

        await mkdir(path.dirname(fallbackPath), { recursive: true });
        await appendFile(fallbackPath, JSON.stringify(logEntry) + "\n");
    } catch (fileError) {
        console.error("Fallback file write failed:", fileError.message);
    }
};

export const sendToSQS = async (logEntry) => {
    if (!queueUrl) {
        console.error("SQS send skipped: AWS_SQS_QUEUE_URL is not configured");
        await writeToFallbackFile(logEntry);
        return false;
    }

    try {
        const command = new SendMessageCommand({
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(logEntry)
        });

        await sqsClient.send(command);
        return true;
    } catch (error) {
        console.error("SQS send failed:", {
            name: error.name,
            message: error.message,
            code: error.Code || error.code,
            statusCode: error.$metadata?.httpStatusCode
        });
       
        await writeToFallbackFile(logEntry);
        return false;
    }
};
