import express from "express";
import { 
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    getCarConfigurations,
    saveConfiguration
} from "../controllers/carController.js";

const router = express.Router();

// Get all available car models
router.get("/", getAllCars);

// Get a specific car by ID
router.get("/:id", getCarById);

// Create a new car configuration
router.post("/", createCar);

// Update a car configuration
router.put("/:id", updateCar);

// Delete a car configuration
router.delete("/:id", deleteCar);

// Get all configurations for a specific car model
router.get("/:id/configurations", getCarConfigurations);

// Configuration routes
router.post("/:id/save-configuration", saveConfiguration);

export default router; 