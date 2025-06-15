import { Client } from 'minio';
import { config } from '../config/config.js';

// Initialize MinIO client
const minioClient = new Client({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    useSSL: config.minio.useSSL,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey
});

// Initialize bucket
export const initializeMinio = async () => {
    try {
        const bucketExists = await minioClient.bucketExists(config.minio.bucketName);
        if (!bucketExists) {
            await minioClient.makeBucket(config.minio.bucketName, 'us-east-1');
            // Set bucket policy to public read
            const policy = {
                Version: '2012-10-17',
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: { AWS: ['*'] },
                        Action: ['s3:GetObject'],
                        Resource: [`arn:aws:s3:::${config.minio.bucketName}/*`]
                    }
                ]
            };
            await minioClient.setBucketPolicy(config.minio.bucketName, JSON.stringify(policy));
        }
        console.log('MinIO initialized successfully');
    } catch (error) {
        console.error('Error initializing MinIO:', error);
        throw error;
    }
};

// Upload file to MinIO
export const uploadFile = async (file, objectName) => {
    try {
        await minioClient.putObject(
            config.minio.bucketName,
            objectName,
            file.buffer,
            file.size,
            {
                'Content-Type': file.mimetype
            }
        );
        return `http://${config.minio.endPoint}:${config.minio.port}/${config.minio.bucketName}/${objectName}`;
    } catch (error) {
        console.error('Error uploading file to MinIO:', error);
        throw error;
    }
};

// Get presigned URL for file
export const getPresignedUrl = async (objectName, expirySeconds = 604800) => {
    try {
        return await minioClient.presignedGetObject(
            config.minio.bucketName,
            objectName,
            expirySeconds
        );
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        throw error;
    }
};

// Delete file from MinIO
export const deleteFile = async (objectName) => {
    try {
        await minioClient.removeObject(config.minio.bucketName, objectName);
    } catch (error) {
        console.error('Error deleting file from MinIO:', error);
        throw error;
    }
};

export default minioClient; 