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
  [1.6, 0.9, 0.6],
  [-1.7, 0.75, -0.5],
  [1.5, -0.95, -0.6],
  [-1.55, -0.8, 0.65],
  [0, 1.65, 0.1],
  [0, -1.65, -0.1],
]

function ringPoints(count: number, radius: number, y: number): [number, number, number][] {
  return Array.from({ length: count + 1 }, (_, index) => {
    const angle = (index / count) * Math.PI * 2
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius]
  })
}

function Core() {
  const group = useRef<Group>(null)
  const knot = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y -= delta * 0.1
    if (knot.current) {
      knot.current.rotation.x = state.clock.elapsedTime * 0.11
      knot.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh castShadow ref={knot}>
          <torusKnotGeometry args={[0.92, 0.24, 140, 16, 2, 3]} />
          <meshPhysicalMaterial
            color="#141c48"
            emissive="#6d5dfc"
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.65}
            transparent
            opacity={0.88}
            wireframe
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.62, 0]} />
          <meshPhysicalMaterial
            color="#42d7ff"
            emissive="#2ad9ff"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.7}
            transparent
            opacity={0.45}
          />
        </mesh>
        <Line points={ringPoints(64, 1.75, 0)} color="#4f8cff" lineWidth={0.7} transparent opacity={0.5} />
        <Line
          points={ringPoints(64, 1.4, 0).map(([x, , z]) => [x, 0.55, z] as [number, number, number])}
          color="#8257ff"
          lineWidth={0.6}
          transparent
          opacity={0.4}
        />
        {nodes.map((position, index) => (
          <group key={index} position={position}>
            <mesh castShadow rotation={[0.4, 0.6, 0]}>
              <boxGeometry args={[0.15, 0.15, 0.15]} />
              <meshStandardMaterial
                color={index % 2 ? '#8b75ff' : '#44d9ff'}
                emissive={index % 2 ? '#745cff' : '#44d9ff'}
                emissiveIntensity={1.4}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshBasicMaterial color="#4aa8ff" transparent opacity={0.08} />
            </mesh>
          </group>
        ))}
        {nodes.map((position, index) => {
          const next = nodes[(index + 1) % nodes.length]
          return (
            <Line
              key={`link-${index}`}
              points={[position, next]}
              color={index % 2 ? '#44d9ff' : '#745cff'}
              lineWidth={0.6}
              transparent
              opacity={0.3}
            />
          )
        })}
      </Float>
    </group>
  )
}

export function DataFlowCore({ onLoaded, onReady, onFail }: Scene3DProps) {
  const [ready, setReady] = useState(false)
  const handleReady = useCallback(() => {
    setReady(true)
    onReady()
  }, [onReady])

  useEffect(() => {
    onLoaded()
  }, [onLoaded])

  return (
    <div className="canvas-wrap" aria-label="Modelo 3D de flujo de datos conectado">
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
        <PerspectiveCamera makeDefault position={[0.4, 0.3, 6.3]} fov={42} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[-4, 4, 3]} intensity={2} color="#8ac5ff" castShadow />
        <pointLight position={[4, -2, 3]} intensity={22} color="#2ad9ff" />
        <pointLight position={[-3, 2, 2]} intensity={20} color="#684bff" />
        <Suspense fallback={null}>
          <Core />
          <SceneReadySignal onReady={handleReady} />
          <Sparkles count={40} scale={5.2} size={1.4} speed={0.18} color="#8f9fff" opacity={0.45} />
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.32}
            scale={7}
            blur={2.7}
            far={4}
            color="#080d22"
          />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={-0.3}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
      <div className="canvas-label">
        <span className="status-dot" /> Flujo de datos en vivo
      </div>
      <div className="canvas-hint">Arrastra para explorar</div>
    </div>
  )
}
