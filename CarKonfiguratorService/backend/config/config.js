export const config = {
    // Server Configuration
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',

    // MySQL Configuration
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'admin', // Change this in production
        database: 'carconfig',
        port: 3306
    },

    // MinIO Configuration
    minio: {
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin',
        bucketName: 'car-images'
    }
}; 