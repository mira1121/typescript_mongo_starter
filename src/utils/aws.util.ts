import { S3Client } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";

const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
};
export const s3 = new S3Client(config);

AWS.config.region = process.env.AWS_REGION;
export const textract = new AWS.Textract();
export const rekognition = new AWS.Rekognition();