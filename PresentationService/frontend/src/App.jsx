import SupercarMap from "./components/Map";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/bmw.glb");
  return <primitive object={scene} {...props} />
}

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">Road to the Super Car Presentation</h1>
      <SupercarMap />
      <Canvas dpr={[1,2]} shadows camera={{ fov: 45 }} style={{position: "absolute", width: "50vw", height: "40vh"}}>
      <color attach="background" args={["#101010"]} />
      <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
        <Stage environment={"sunset"}>
          <Model scale={0.01} />
        </Stage>
      </PresentationControls>
    </Canvas>
    </div>
  );
}

export default App;