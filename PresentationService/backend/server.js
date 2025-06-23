import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Setup für __dirname (ESModule Workaround)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.json({
    blogPost: [
      {
        title: "test",
        content: "testcontent",
      },
    ],
  });
});

const routeData = [
  {
    id: 1,
    city: "Paris",
    coords: [48.8566, 2.3522],
    eta: "2025-06-24 12:00",
    image: "/images/paris.jpg",
  },
  {
    id: 2,
    city: "Berlin",
    coords: [52.52, 13.405],
    eta: "2025-06-25 10:00",
    image: "/images/berlin.jpg",
  },
  {
    id: 3,
    city: "Warsaw",
    coords: [52.2297, 21.0122],
    eta: "2025-06-26 14:00",
    image: "/images/warsaw.jpg",
  },
];

app.get("/api/presentation/route", (req, res) => {
  res.json(routeData);
});

// Starte Backend-Server
app.listen(8080, () => {
  console.log("🚀 Backend läuft auf http://localhost:8080");
});
