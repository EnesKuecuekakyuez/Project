import pool from '../models/database.js';
import { getPresignedUrl } from '../models/minio.js';

// Temporary in-memory storage (replace with database in production)
let cars = [
    {
        id: 1,
        model: "Model S",
        brand: "Tesla",
        basePrice: 75000,
        configurations: [
            {
                id: 1,
                name: "Standard Range",
                price: 0,
                features: ["Dual Motor AWD", "Autopilot", "Glass Roof"]
            },
            {
                id: 2,
                name: "Long Range",
                price: 10000,
                features: ["Dual Motor AWD", "Enhanced Autopilot", "Glass Roof", "Premium Sound"]
            }
        ]
    },
    {
        id: 2,
        model: "Model 3",
        brand: "Tesla",
        basePrice: 45000,
        configurations: [
            {
                id: 1,
                name: "Standard Range",
                price: 0,
                features: ["Single Motor RWD", "Autopilot", "Glass Roof"]
            },
            {
                id: 2,
                name: "Performance",
                price: 15000,
                features: ["Dual Motor AWD", "Enhanced Autopilot", "Track Mode", "Performance Brakes"]
            }
        ]
    }
];

// Get all cars
export const getAllCars = async (req, res) => {
    try {
        const [cars] = await pool.execute(`
            SELECT c.*, 
                   GROUP_CONCAT(DISTINCT conf.id) as configuration_ids,
                   GROUP_CONCAT(DISTINCT conf.name) as configuration_names
            FROM cars c
            LEFT JOIN configurations conf ON c.id = conf.car_id
            GROUP BY c.id
        `);

        // Get configurations for each car
        const carsWithConfigs = await Promise.all(cars.map(async (car) => {
            const [configurations] = await pool.execute(
                'SELECT * FROM configurations WHERE car_id = ?',
                [car.id]
            );
            return {
                ...car,
                configurations
            };
        }));

        res.json({
            success: true,
            data: carsWithConfigs
        });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching cars",
            error: error.message
        });
    }
};

// Get car by ID
export const getCarById = async (req, res) => {
    try {
        const [cars] = await pool.execute(
            'SELECT * FROM cars WHERE id = ?',
            [req.params.id]
        );

        if (cars.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        const car = cars[0];

        // Get configurations
        const [configurations] = await pool.execute(
            'SELECT * FROM configurations WHERE car_id = ?',
            [car.id]
        );

        // Get available colors
        const [colors] = await pool.execute('SELECT * FROM colors');

        // Get available accessories
        const [accessories] = await pool.execute('SELECT * FROM accessories');

        // Get presigned URLs for images if they exist
        const carWithUrls = {
            ...car,
            configurations,
            colors: await Promise.all(colors.map(async (color) => ({
                ...color,
                imageUrl: color.image_url ? await getPresignedUrl(color.image_url) : null
            }))),
            accessories: await Promise.all(accessories.map(async (accessory) => ({
                ...accessory,
                imageUrl: accessory.image_url ? await getPresignedUrl(accessory.image_url) : null
            })))
        };

        res.json({
            success: true,
            data: carWithUrls
        });
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching car",
            error: error.message
        });
    }
};

// Create new car
export const createCar = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { model, brand, basePrice, configurations } = req.body;
        
        if (!model || !brand || !basePrice) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Insert car
        const [result] = await connection.execute(
            'INSERT INTO cars (model, brand, base_price) VALUES (?, ?, ?)',
            [model, brand, basePrice]
        );

        const carId = result.insertId;

        // Insert configurations if provided
        if (configurations && configurations.length > 0) {
            const configValues = configurations.map(conf => [
                carId,
                conf.name,
                conf.price,
                JSON.stringify(conf.features || [])
            ]);

            await connection.execute(
                'INSERT INTO configurations (car_id, name, price, features) VALUES ?',
                [configValues]
            );
        }

        await connection.commit();

        // Fetch the created car with its configurations
        const [cars] = await connection.execute(
            'SELECT * FROM cars WHERE id = ?',
            [carId]
        );

        const [configs] = await connection.execute(
            'SELECT * FROM configurations WHERE car_id = ?',
            [carId]
        );

        res.status(201).json({
            success: true,
            data: {
                ...cars[0],
                configurations: configs
            }
        });
    } catch (error) {
        await connection.rollback();
        console.error('Error creating car:', error);
        res.status(500).json({
            success: false,
            message: "Error creating car",
            error: error.message
        });
    } finally {
        connection.release();
    }
};

// Update car
export const updateCar = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;
        const { model, brand, basePrice, configurations } = req.body;
        
        // Check if car exists
        const [cars] = await connection.execute(
            'SELECT * FROM cars WHERE id = ?',
            [id]
        );

        if (cars.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        // Update car
        await connection.execute(
            'UPDATE cars SET model = ?, brand = ?, base_price = ? WHERE id = ?',
            [model, brand, basePrice, id]
        );

        // Update configurations if provided
        if (configurations) {
            // Delete existing configurations
            await connection.execute(
                'DELETE FROM configurations WHERE car_id = ?',
                [id]
            );

            // Insert new configurations
            if (configurations.length > 0) {
                const configValues = configurations.map(conf => [
                    id,
                    conf.name,
                    conf.price,
                    JSON.stringify(conf.features || [])
                ]);

                await connection.execute(
                    'INSERT INTO configurations (car_id, name, price, features) VALUES ?',
                    [configValues]
                );
            }
        }

        await connection.commit();

        // Fetch updated car with configurations
        const [updatedCars] = await connection.execute(
            'SELECT * FROM cars WHERE id = ?',
            [id]
        );

        const [configs] = await connection.execute(
            'SELECT * FROM configurations WHERE car_id = ?',
            [id]
        );

        res.json({
            success: true,
            data: {
                ...updatedCars[0],
                configurations: configs
            }
        });
    } catch (error) {
        await connection.rollback();
        console.error('Error updating car:', error);
        res.status(500).json({
            success: false,
            message: "Error updating car",
            error: error.message
        });
    } finally {
        connection.release();
    }
};

// Delete car
export const deleteCar = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;
        
        // Check if car exists
        const [cars] = await connection.execute(
            'SELECT * FROM cars WHERE id = ?',
            [id]
        );

        if (cars.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        // Delete car (configurations will be deleted automatically due to CASCADE)
        await connection.execute(
            'DELETE FROM cars WHERE id = ?',
            [id]
        );

        await connection.commit();

        res.json({
            success: true,
            message: "Car deleted successfully"
        });
    } catch (error) {
        await connection.rollback();
        console.error('Error deleting car:', error);
        res.status(500).json({
            success: false,
            message: "Error deleting car",
            error: error.message
        });
    } finally {
        connection.release();
    }
};

// Get car configurations
export const getCarConfigurations = async (req, res) => {
    try {
        const [configurations] = await pool.execute(
            'SELECT * FROM configurations WHERE car_id = ?',
            [req.params.id]
        );

        if (configurations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No configurations found for this car"
            });
        }

        res.json({
            success: true,
            data: configurations
        });
    } catch (error) {
        console.error('Error fetching car configurations:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching car configurations",
            error: error.message
        });
    }
};

// Save car configuration
export const saveConfiguration = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { carId, configurationId, userId, color, accessories, totalPrice } = req.body;

        const [result] = await connection.execute(
            `INSERT INTO saved_configurations 
            (car_id, configuration_id, user_id, color, accessories, total_price) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [carId, configurationId, userId, color, JSON.stringify(accessories), totalPrice]
        );

        await connection.commit();

        const [savedConfig] = await connection.execute(
            'SELECT * FROM saved_configurations WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            data: savedConfig[0]
        });
    } catch (error) {
        await connection.rollback();
        console.error('Error saving configuration:', error);
        res.status(500).json({
            success: false,
            message: "Error saving configuration",
            error: error.message
        });
    } finally {
        connection.release();
    }
}; 