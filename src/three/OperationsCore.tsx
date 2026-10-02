import {
  ContactShadows,
  Float,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import type { Scene3DProps } from '../components/LazyScene3D'
import { watchContextLoss } from '../lib/webgl'
import { SceneReadySignal } from './SceneReadySignal'

const nodes: [number, number, number][] = [
  [-1.9, 0.8, 0.15],
  [1.75, 1.05, -0.2],
  [-1.55, -1.1, 0.35],
  [1.75, -0.85, 0.2],
  [0.1, 1.85, -0.25],
  [-0.15, -1.75, 0.1],
  [1.15, 0.1, 1.2],
  [-1.1, 0.05, 1.1],
]

function Core() {
  const group = useRef<Group>(null)
  const inner = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08
    if (inner.current) {
      inner.current.rotation.x = state.clock.elapsedTime * 0.14
      inner.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.35}>
        <mesh castShadow ref={inner}>
          <icosahedronGeometry args={[1.18, 2]} />
          <meshPhysicalMaterial
            color="#111e4a"
            emissive="#155eef"
            emissiveIntensity={0.3}
            roughness={0.22}
            metalness={0.6}
            transparent
            opacity={0.86}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.84, 1]} />
          <meshPhysicalMaterial
            color="#4f8cff"
            emissive="#6d5dfc"
            emissiveIntensity={0.65}
            roughness={0.12}
            metalness={0.75}
            transparent
            opacity={0.42}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.65, 0.012, 12, 120]} />
          <meshBasicMaterial color="#42d7ff" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[0.7, 0.35, 0]}>
          <torusGeometry args={[1.48, 0.008, 12, 120]} />
          <meshBasicMaterial color="#8257ff" transparent opacity={0.52} />
        </mesh>
        {nodes.map((position, index) => (
          <group key={index} position={position}>
            <mesh castShadow>
              <sphereGeometry args={[0.075, 18, 18]} />
              <meshStandardMaterial
                color={index % 2 ? '#44d9ff' : '#8b75ff'}
                emissive={index % 2 ? '#44d9ff' : '#745cff'}
                emissiveIntensity={1.5}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshBasicMaterial color="#4aa8ff" transparent opacity={0.1} />
            </mesh>
          </group>
        ))}
        {nodes.slice(0, 6).map((position, index) => (
          <Line
            key={`line-${index}`}
            points={[[0, 0, 0], position]}
            color={index % 2 ? '#44d9ff' : '#745cff'}
            lineWidth={0.7}
            transparent
            opacity={0.42}
          />
        ))}
      </Float>
    </group>
  )
}

// En pantallas táctiles la figura solo gira sola: si se pudiera arrastrar, deslizar el dedo sobre
// ella no desplazaría la página (OrbitControls pone touch-action: none en el canvas)
const isTouchScreen = () => window.matchMedia('(pointer: coarse)').matches

export function OperationsCore({ onLoaded, onReady, onFail }: Scene3DProps) {
  const [ready, setReady] = useState(false)
  const [touch] = useState(isTouchScreen)
  const handleReady = useCallback(() => {
    setReady(true)
    onReady()
  }, [onReady])

  useEffect(() => {
    onLoaded()
  }, [onLoaded])

  return (
    <div
      className={`canvas-wrap ${touch ? 'is-touch' : ''}`}
      aria-label="Modelo 3D interactivo de operaciones conectadas"
    >
      <Canvas
        className={`canvas-3d ${ready ? '' : 'is-loading'}`}
        dpr={[1, 1.6]}
        // Sin debounce en la medición: con el de por defecto (50 ms) la primera medida del
        // contenedor a veces se pierde, el canvas nunca arranca y el loader se queda en 93 %
        resize={{ debounce: 0 }}
        shadows
        gl={{ alpha: true, antialias: true }}
        onCreated={(state) => watchContextLoss(state, onFail)}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6.3]} fov={42} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#8ac5ff" castShadow />
        <pointLight position={[-4, -2, 3]} intensity={25} color="#684bff" />
        <pointLight position={[3, 1, 2]} intensity={18} color="#2ad9ff" />
        <Suspense fallback={null}>
          <Core />
          <SceneReadySignal onReady={handleReady} />
          <Sparkles count={45} scale={5} size={1.5} speed={0.22} color="#70b7ff" opacity={0.5} />
          <ContactShadows
            position={[0, -2.15, 0]}
            opacity={0.35}
            scale={7}
            blur={2.7}
            far={4}
            color="#080d22"
          />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={!touch}
          autoRotate
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 2.7}
          maxPolarAngle={Math.PI / 1.65}
        />
      </Canvas>
      <div className="canvas-label">
        <span className="status-dot" /> Sistema operativo conectado
      </div>
      {!touch && <div className="canvas-hint">Arrastra para explorar</div>}
    </div>
  )
}
