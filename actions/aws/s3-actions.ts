"use server";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3BucketClient } from "./client";

const baseFolder = process.env.AMAZON_S3_BUCKET_BASE_FOLDER;
const bucketName = process.env.AMAZON_S3_BUCKET_NAME;

export const getBucketObjects = async (folderPath: string) => {
  try {
    const s3Client = await getS3BucketClient();

    const listFolderObjects = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `${baseFolder}/${folderPath}`,
    });
    const { Contents } = await s3Client.send(listFolderObjects);
    return Contents;
  } catch (error) {
    throw error;
  }
};

export const uploadBucketObject = async (
  folderPath: string,
  formData: any,
  fileName: string = "default.pdf"
) => {
  try {
    const s3Client = await getS3BucketClient();
    const file = formData.get("file");
    const buffer = Buffer.from(await file.arrayBuffer());
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `projectspecification/${folderPath}/${fileName}`,
      Body: buffer,
    });
    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};
