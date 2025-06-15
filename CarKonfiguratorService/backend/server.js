import express from "express";
import cors from "cors";
import multer from "multer";
import { config } from "./config/config.js";
import { initializeDatabase } from "./models/database.js";
import { initializeMinio } from "./models/minio.js";
import carRoutes from "./routes/carRoutes.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/cars", carRoutes);

// File upload endpoint
app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const objectName = `car-images/${Date.now()}-${req.file.originalname}`;
        const imageUrl = await uploadFile(req.file, objectName);

        res.json({
            success: true,
            data: {
                url: imageUrl,
                objectName
            }
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({
            success: false,
            message: "Error uploading file",
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: config.nodeEnv === "development" ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Initialize services and start server
const startServer = async () => {
    try {
        // Initialize database
        await initializeDatabase();
        
        // Initialize MinIO
        await initializeMinio();
        
        // Start server
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();