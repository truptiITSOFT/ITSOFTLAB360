"use client";

import type { CSSProperties } from "react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Html,
  OrbitControls,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import "./solutions-factory.css";

export const SOLUTIONS = [
  {
    short: "HR",
    title: "HRMS",
    description:
      "Manage the complete employee lifecycle, attendance, payroll, leave, recruitment, and performance.",
    color: "#FF6B35",
    href: "/solutions/hrms",
  },
  {
    short: "CRM",
    title: "Customer Relationship Management",
    description:
      "Build stronger customer relationships and increase sales with complete lead and customer management.",
    color: "#00C2FF",
    href: "/solutions/crm",
  },
  {
    short: "ERP",
    title: "Enterprise Resource Planning",
    description:
      "Connect finance, operations, procurement, inventory, and core business processes in one platform.",
    color: "#8B5CF6",
    href: "/solutions/erp",
  },
  {
    short: "DMS",
    title: "Dealer Management System",
    description:
      "Manage dealer networks, orders, inventory, incentives, and distributor performance.",
    color: "#F59E0B",
    href: "/solutions/dealer-management",
  },
  {
    short: "VMS",
    title: "Vendor Management System",
    description:
      "Handle vendor onboarding, procurement, contracts, purchase orders, and payments efficiently.",
    color: "#10B981",
    href: "/solutions/vendor-management",
  },
  {
    short: "MKT",
    title: "Marketing Automation",
    description:
      "Automate campaigns, email marketing, lead nurturing, customer journeys, and analytics.",
    color: "#EC4899",
    href: "/solutions/marketing-automation",
  },
  {
    short: "SCL",
    title: "Supply Chain & Logistics",
    description:
      "Optimize procurement, warehouses, inventory, shipments, transport, and delivery operations.",
    color: "#22C55E",
    href: "/solutions/supply-chain-logistics",
  },
  {
    short: "SFA",
    title: "Sales Force Automation",
    description:
      "Track leads, opportunities, quotations, field visits, sales activity, and team performance.",
    color: "#3B82F6",
    href: "/solutions/sales-force-automation",
  },
  {
    short: "LMS",
    title: "Learning Management System",
    description:
      "Deliver online training, certifications, assessments, employee learning, and compliance courses.",
    color: "#A855F7",
    href: "/solutions/learning-management",
  },
  {
    short: "POS",
    title: "Smart Point of Sale",
    description:
      "Run billing, payments, inventory, customers, retail outlets, restaurants, and supermarkets.",
    color: "#14B8A6",
    href: "/solutions/point-of-sale",
  },
  {
    short: "QMS",
    title: "Queue Management System",
    description:
      "Manage appointments, digital tokens, waiting time, service counters, and customer flow.",
    color: "#F97316",
    href: "/solutions/queue-management",
  },
  {
    short: "DOC",
    title: "Document Management System",
    description:
      "Store, organize, search, share, approve, and secure business documents from one place.",
    color: "#6366F1",
    href: "/solutions/document-management",
  },
] as const;

type Solution = (typeof SOLUTIONS)[number];

type SceneProps = {
  activeIndex: number;
  activeSolution: Solution;
  motionEnabled: boolean;
  onSelect: (index: number) => void;
};

function Conveyor({
  position,
  direction = 1,
}: {
  position: [number, number, number];
  direction?: 1 | -1;
}) {
  const slatsRef = useRef<THREE.Group>(null);
  const count = 16;
  const length = 5;
  const spacing = length / count;

  useFrame(({ clock }) => {
    if (!slatsRef.current) return;

    const travel = clock.getElapsedTime() * 1.05 * direction;
    slatsRef.current.children.forEach((slat, index) => {
      const raw = index * spacing + travel;
      slat.position.x = ((raw % length) + length) % length - length / 2;
    });
  });

  return (
    <group position={position}>
      <RoundedBox args={[length, 0.36, 1.45]} radius={0.16} smoothness={5}>
        <meshStandardMaterial color="#13161d" metalness={0.82} roughness={0.28} />
      </RoundedBox>

      <mesh position={[0, 0.22, -0.67]}>
        <boxGeometry args={[length + 0.18, 0.13, 0.11]} />
        <meshStandardMaterial color="#6b7280" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.22, 0.67]}>
        <boxGeometry args={[length + 0.18, 0.13, 0.11]} />
        <meshStandardMaterial color="#6b7280" metalness={0.95} roughness={0.2} />
      </mesh>

      <group ref={slatsRef} position={[0, 0.23, 0]}>
        {Array.from({ length: count }).map((_, index) => (
          <mesh key={index} position={[index * spacing - length / 2, 0, 0]}>
            <boxGeometry args={[0.055, 0.08, 1.18]} />
            <meshStandardMaterial color="#3a3f49" metalness={0.75} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function MachineCore({ solution }: { solution: Solution }) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const glowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const targetColor = useMemo(() => new THREE.Color(solution.color), [solution.color]);

  const cells = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        position: [
          (((index * 37) % 100) / 100) * 3.2 - 1.6,
          (((index * 53) % 100) / 100) * 1.65 - 0.55,
          (((index * 71) % 100) / 100) * 2.25 - 1.125,
        ] as [number, number, number],
        scale: 0.16 + (((index * 29) % 10) / 10) * 0.23,
      })),
    [],
  );

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.36) * 0.055;
      groupRef.current.position.y = Math.sin(elapsed * 0.85) * 0.045;
    }

    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor, 1 - Math.exp(-delta * 4));
      lightRef.current.intensity = 23 + Math.sin(elapsed * 2.2) * 4;
    }

    if (glowMaterialRef.current) {
      glowMaterialRef.current.color.lerp(targetColor, 1 - Math.exp(-delta * 4));
      glowMaterialRef.current.emissive.lerp(targetColor, 1 - Math.exp(-delta * 4));
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <RoundedBox
        args={[4.85, 0.55, 4.05]}
        radius={0.25}
        smoothness={7}
        position={[0, -1.18, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#11141a" metalness={0.9} roughness={0.22} />
      </RoundedBox>

      <RoundedBox
        args={[4.25, 2.7, 3.45]}
        radius={0.38}
        smoothness={9}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#ff8a42"
          metalness={0.18}
          roughness={0.12}
          transmission={0.48}
          thickness={1.25}
          transparent
          opacity={0.3}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </RoundedBox>

      <RoundedBox args={[3.55, 2.15, 2.8]} radius={0.25} smoothness={7}>
        <meshStandardMaterial
          ref={glowMaterialRef}
          color={solution.color}
          emissive={solution.color}
          emissiveIntensity={0.32}
          metalness={0.22}
          roughness={0.48}
          transparent
          opacity={0.46}
        />
      </RoundedBox>

      {cells.map((cell, index) => (
        <RoundedBox
          key={index}
          args={[cell.scale, cell.scale, cell.scale]}
          radius={0.035}
          smoothness={3}
          position={cell.position}
        >
          <meshStandardMaterial
            color={index % 3 === 0 ? solution.color : "#ffbf7c"}
            emissive={solution.color}
            emissiveIntensity={index % 3 === 0 ? 1.15 : 0.32}
            metalness={0.25}
            roughness={0.42}
          />
        </RoundedBox>
      ))}

      <pointLight
        ref={lightRef}
        color={solution.color}
        intensity={24}
        distance={8}
        decay={2}
        position={[0, 0.25, 0]}
      />

      <RoundedBox
        args={[2.9, 0.42, 2.35]}
        radius={0.18}
        smoothness={6}
        position={[0, 1.55, 0]}
        castShadow
      >
        <meshStandardMaterial color="#080a0e" metalness={0.94} roughness={0.18} />
      </RoundedBox>

      <Html transform center position={[0, 1.79, 0]} distanceFactor={7.5}>
        <div className="solution-core-mark" aria-hidden="true">
          <span>ONE</span>
          <strong>12</strong>
        </div>
      </Html>

      <mesh position={[-2.23, 0, 0]} rotation-z={Math.PI / 2}>
        <torusGeometry args={[0.8, 0.13, 18, 64, Math.PI]} />
        <meshStandardMaterial color="#aeb4bf" metalness={0.9} roughness={0.24} />
      </mesh>
      <mesh position={[2.23, 0, 0]} rotation-z={-Math.PI / 2}>
        <torusGeometry args={[0.8, 0.13, 18, 64, Math.PI]} />
        <meshStandardMaterial color="#aeb4bf" metalness={0.9} roughness={0.24} />
      </mesh>
    </group>
  );
}

function SolutionNode({
  solution,
  index,
  total,
  active,
  motionEnabled,
  onSelect,
}: {
  solution: Solution;
  index: number;
  total: number;
  active: boolean;
  motionEnabled: boolean;
  onSelect: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tileRef = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const baseY = 0.95 + Math.cos(angle * 2) * 0.24;
  const radius = 5.25;

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || !tileRef.current) return;

    const targetScale = active ? 1.3 : 0.72;
    const currentScale = THREE.MathUtils.damp(
      groupRef.current.scale.x,
      targetScale,
      5.5,
      delta,
    );
    groupRef.current.scale.setScalar(currentScale);

    const bob = motionEnabled
      ? Math.sin(clock.getElapsedTime() * 1.7 + index * 0.72) * 0.11
      : 0;
    groupRef.current.position.y = baseY + bob;

    if (motionEnabled) {
      tileRef.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 1.15 + index) * 0.045;
    } else {
      tileRef.current.rotation.z = 0;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[Math.sin(angle) * radius, baseY, Math.cos(angle) * radius]}
    >
      <group ref={tileRef}>
        <RoundedBox
          args={[1.4, 1.4, 0.54]}
          radius={0.2}
          smoothness={7}
          castShadow
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          <meshStandardMaterial
            color={active ? solution.color : "#171b23"}
            emissive={solution.color}
            emissiveIntensity={active ? 0.75 : 0.16}
            metalness={0.68}
            roughness={0.25}
          />
        </RoundedBox>

        <RoundedBox
          args={[1.08, 1.08, 0.12]}
          radius={0.16}
          smoothness={6}
          position={[0, 0, 0.32]}
        >
          <meshStandardMaterial
            color="#07090d"
            metalness={0.88}
            roughness={0.2}
          />
        </RoundedBox>

        <Html transform sprite center position={[0, 0, 0.42]} distanceFactor={7.2}>
          <div
            className={`solution-node-label${active ? " is-active" : ""}`}
            style={{ "--node-accent": solution.color } as CSSProperties}
          >
            {solution.short}
          </div>
        </Html>
      </group>
    </group>
  );
}

function SolutionRing({
  activeIndex,
  motionEnabled,
  onSelect,
}: {
  activeIndex: number;
  motionEnabled: boolean;
  onSelect: (index: number) => void;
}) {
  const ringRef = useRef<THREE.Group>(null);
  const targetRotation = -(activeIndex / SOLUTIONS.length) * Math.PI * 2;

  useFrame((_, delta) => {
    if (!ringRef.current) return;

    ringRef.current.rotation.y = motionEnabled
      ? THREE.MathUtils.damp(
          ringRef.current.rotation.y,
          targetRotation,
          4.2,
          delta,
        )
      : targetRotation;
  });

  return (
    <group ref={ringRef}>
      {SOLUTIONS.map((solution, index) => (
        <SolutionNode
          key={solution.short}
          solution={solution}
          index={index}
          total={SOLUTIONS.length}
          active={index === activeIndex}
          motionEnabled={motionEnabled}
          onSelect={() => onSelect(index)}
        />
      ))}
    </group>
  );
}

function Scene({
  activeIndex,
  activeSolution,
  motionEnabled,
  onSelect,
}: SceneProps) {
  return (
    <>
      <fog attach="fog" args={["#07090d", 11, 25]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#dbeafe", "#090a0d", 1.15]} />
      <directionalLight
        castShadow
        position={[6, 9, 8]}
        intensity={3.5}
        color="#fff5e9"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        castShadow
        position={[-7, 8, 5]}
        angle={0.4}
        penumbra={0.9}
        intensity={7}
        color={activeSolution.color}
      />

      <group position={[0.85, 0, 0]}>
        <Conveyor position={[-4.7, -0.2, 0]} direction={1} />
        <Conveyor position={[4.7, -0.2, 0]} direction={1} />
        <MachineCore solution={activeSolution} />
        <SolutionRing
          activeIndex={activeIndex}
          motionEnabled={motionEnabled}
          onSelect={onSelect}
        />
      </group>

      <Sparkles
        count={74}
        scale={[15, 7, 12]}
        size={1.35}
        speed={motionEnabled ? 0.18 : 0}
        color={activeSolution.color}
      />

      <mesh rotation-x={-Math.PI / 2} position={[0, -1.32, 0]} receiveShadow>
        <planeGeometry args={[35, 35]} />
        <meshStandardMaterial color="#080a0e" metalness={0.25} roughness={0.82} />
      </mesh>

      <gridHelper
        args={[30, 30, "#262b34", "#151920"]}
        position={[0, -1.3, 0]}
      />

      <ContactShadows
        position={[0, -1.28, 0]}
        opacity={0.48}
        scale={18}
        blur={2.8}
        far={8}
      />

      <OrbitControls
        target={[0.6, 0.15, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.25}
        maxPolarAngle={Math.PI / 2.25}
        minAzimuthAngle={-0.38}
        maxAzimuthAngle={0.38}
      />
    </>
  );
}

export default function SolutionsFactory3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const activeSolution = SOLUTIONS[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setMotionEnabled(!mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!motionEnabled) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SOLUTIONS.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [motionEnabled]);

  const sectionStyle = {
    "--solution-accent": activeSolution.color,
  } as CSSProperties;

  return (
    <section
      className="solutions-factory"
      style={sectionStyle}
      aria-label="Interactive overview of twelve IT solutions"
    >
      <div className="solutions-factory__aurora" aria-hidden="true" />

      <header className="solutions-factory__copy">
        <div className="solutions-factory__eyebrow">
          <span className="solutions-factory__live-dot" />
          Interactive 3D solution ecosystem
        </div>
        <h2>
          All 12 IT solutions.
          <br />
          <span>One connected platform.</span>
        </h2>
        <p>
          Select a module and watch the central business engine transform to
          represent that solution.
        </p>
      </header>

      <div className="solutions-factory__canvas" aria-hidden="true">
        <Canvas
          shadows
          dpr={[1, 1.6]}
          camera={{ position: [0, 4.25, 13.5], fov: 39, near: 0.1, far: 60 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <Scene
              activeIndex={activeIndex}
              activeSolution={activeSolution}
              motionEnabled={motionEnabled}
              onSelect={setActiveIndex}
            />
          </Suspense>
        </Canvas>
      </div>

      <article
        className="solutions-factory__readout"
        style={{ boxShadow: `0 19.2px 72px ${activeSolution.color}2b` }}
      >
        <div className="solutions-factory__number">
          {String(activeIndex + 1).padStart(2, "0")}
        </div>
        <div className="solutions-factory__readout-content">
          <span>Active solution</span>
          <h3>{activeSolution.title}</h3>
          <p>{activeSolution.description}</p>
          <a href={activeSolution.href}>
            Explore solution <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>

      <div className="solutions-factory__controls" role="tablist" aria-label="Choose a solution">
        {SOLUTIONS.map((solution, index) => (
          <button
            key={solution.short}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Show ${solution.title}`}
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => setActiveIndex(index)}
            title={solution.title}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {solution.short}
          </button>
        ))}
      </div>

      <div className="solutions-factory__hint" aria-hidden="true">
        Drag to explore · Click a module
      </div>
    </section>
  );
}
