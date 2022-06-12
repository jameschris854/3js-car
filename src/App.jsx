import './App.css';
import {  Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import Plane from './components/Plane';
import React,{ Suspense } from 'react';
import {  Environment } from '@react-three/drei'
import Vehicle from './components/Vehicle';

function App() {
  return (
    <Canvas  dpr={[1, 1.5]} shadows >
      <fog attach="fog" args={['#171720', 10, 50]} />
      <color attach="background" args={['#171720']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.5} intensity={1} castShadow penumbra={1} />
      <Physics  broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>
          <Plane rotation={[-Math.PI/2,0,0]} userData={{id:'floor'}} />
            <Vehicle position={[0, 2, 0]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} />
      </Physics>
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}

export default App;
