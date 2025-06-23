import {
  MapContainer,
  TileLayer,
  Marker,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import axios from "axios";

const carIcon = new L.Icon({
  iconUrl: "/red-dot.png",
  iconSize: [30, 30],
  iconAnchor: [20, 20],
});

function AnimatedMarker({ route }) {
  const map = useMap();
  const [position, setPosition] = useState(route[0]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (route.length < 2) return;

    const earthRadius = 6371e3;
    const toRad = deg => deg * (Math.PI / 180);
    const calculateDistance = (a, b) => {
      const dLat = toRad(b[0] - a[0]);
      const dLon = toRad(b[1] - a[1]);
      const lat1 = toRad(a[0]);
      const lat2 = toRad(b[0]);
      const A = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      return earthRadius * 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
    };

    let i = 0;
    let progress = 0;
    const stepTime = 50;
    const speed = 80 * 1000 / 3600;

    const animate = () => {
      if (i >= route.length - 1) return;
      const start = route[i];
      const end = route[i + 1];
      const dist = calculateDistance(start, end);
      const duration = dist / speed * 1000;

      progress += stepTime;
      const t = progress / duration;

      if (t >= 1) {
        i++;
        progress = 0;
        return;
      }

      const lat = start[0] + (end[0] - start[0]) * t;
      const lng = start[1] + (end[1] - start[1]) * t;
      const nextPos = [lat, lng];
      setPosition(nextPos);
      map.panTo(nextPos);
    };

    animationRef.current = setInterval(animate, stepTime);
    return () => clearInterval(animationRef.current);
  }, [route, map]);

  return <Marker position={position} icon={carIcon} />;
}

export default function SupercarMap() {
  const [roadPoints, setRoadPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/presentation/route").then(async res => {
      const coords = res.data.map(p => p.coords);
      const coordString = coords.map(c => `${c[1]},${c[0]}`).join(";");

      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;
      const osrmRes = await axios.get(osrmUrl);
      const geoCoords = osrmRes.data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);

      setRoadPoints(geoCoords);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading route...</p>;

  return (
    <MapContainer center={roadPoints[0]} zoom={6} style={{ height: "80vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <AnimatedMarker route={roadPoints} />
    </MapContainer>
  );
}
