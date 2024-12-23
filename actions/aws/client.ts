"use server"
import { S3Client } from "@aws-sdk/client-s3"

export async function getBucketName() {
  return process.env.AMAZON_S3_BUCKET_NAME || ""
}

export async function getS3BucketClient() {
  const region = process.env.AMAZON_S3_REGION
  const accessKeyId = process.env.AMAZON_ACCESS_KEY_ID
  const secretAccessKey = process.env.AMAZON_SECRET_ACCESS_KEY
  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS S3 configuration")
  }
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
  return s3Client
}
