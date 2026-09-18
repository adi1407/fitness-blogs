"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import { X } from "lucide-react";

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;
  phi: number;
  radius: number;
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  /** When set, the preview modal offers a link to the full page. */
  href?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface VelocityState {
  x: number;
  y: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),

  sphericalToCartesian: (
    radius: number,
    theta: number,
    phi: number,
  ): Position3D => ({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  }),

  calculateDistance: (
    pos: Position3D,
    center: Position3D = { x: 0, y: 0, z: 0 },
  ): number => {
    const dx = pos.x - center.x;
    const dy = pos.y - center.y;
    const dz = pos.z - center.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  normalizeAngle: (angle: number): number => {
    let a = angle;
    while (a > 180) a -= 360;
    while (a < -180) a += 360;
    return a;
  },
};

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.12,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  className = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState<RotationState>({
    x: 15,
    y: 15,
    z: 0,
  });
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>(
    [],
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const velocityRef = useRef(velocity);
  const dragDistanceRef = useRef(0);
  const isDraggingRef = useRef(false);
  velocityRef.current = velocity;

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const imageCount = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = (2 * Math.PI) / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      if (phi < 90) {
        phi = Math.max(5, phi - poleBonus);
      } else {
        phi = Math.min(175, phi + poleBonus);
      }

      phi = 15 + (phi / 180) * 150;
      const randomOffset = (Math.random() - 0.5) * 20;
      theta = (theta + randomOffset) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));

      positions.push({
        theta,
        phi,
        radius: actualSphereRadius,
      });
    }

    return positions;
  }, [images.length, actualSphereRadius]);

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos: Position3D = { x, y, z };
      const fadeZoneStart = -10;
      const fadeZoneEnd = -30;
      const isVisible = worldPos.z > fadeZoneEnd;

      let fadeOpacity = 1;
      if (worldPos.z <= fadeZoneStart) {
        fadeOpacity = Math.max(
          0,
          (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd),
        );
      }

      const isPoleImage = pos.phi < 30 || pos.phi > 150;
      const distanceFromCenter = Math.sqrt(
        worldPos.x * worldPos.x + worldPos.y * worldPos.y,
      );
      const maxDistance = actualSphereRadius;
      const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);
      const distancePenalty = isPoleImage ? 0.4 : 0.7;
      const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);
      const depthScale =
        (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index,
      };
    });

    const adjustedPositions = [...positions];

    for (let i = 0; i < adjustedPositions.length; i++) {
      const pos = adjustedPositions[i];
      if (!pos.isVisible) continue;

      let adjustedScale = pos.scale;
      const imageSize = baseImageSize * adjustedScale;

      for (let j = 0; j < adjustedPositions.length; j++) {
        if (i === j) continue;
        const other = adjustedPositions[j];
        if (!other.isVisible) continue;

        const otherSize = baseImageSize * other.scale;
        const dx = pos.x - other.x;
        const dy = pos.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (imageSize + otherSize) / 2 + 25;

        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance;
          const reductionFactor = Math.max(
            0.4,
            1 - (overlap / minDistance) * 0.6,
          );
          adjustedScale = Math.min(
            adjustedScale,
            adjustedScale * reductionFactor,
          );
        }
      }

      adjustedPositions[i] = {
        ...pos,
        scale: Math.max(0.25, adjustedScale),
      };
    }

    return adjustedPositions;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const clampRotationSpeed = useCallback(
    (speed: number): number =>
      Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed)),
    [maxRotationSpeed],
  );

  const updateMomentum = useCallback(() => {
    if (isDragging) return;

    setVelocity((prev) => {
      const newVelocity = {
        x: prev.x * momentumDecay,
        y: prev.y * momentumDecay,
      };
      if (
        !autoRotate &&
        Math.abs(newVelocity.x) < 0.01 &&
        Math.abs(newVelocity.y) < 0.01
      ) {
        return { x: 0, y: 0 };
      }
      return newVelocity;
    });

    setRotation((prev) => {
      const v = velocityRef.current;
      let newY = prev.y;
      if (autoRotate) newY += autoRotateSpeed;
      newY += clampRotationSpeed(v.y);
      return {
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(v.x)),
        y: SPHERE_MATH.normalizeAngle(newY),
        z: prev.z,
      };
    });
  }, [
    isDragging,
    momentumDecay,
    clampRotationSpeed,
    autoRotate,
    autoRotateSpeed,
  ]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      dragDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);
      const rotationDelta = {
        x: -deltaY * dragSensitivity,
        y: deltaX * dragSensitivity,
      };
      setRotation((prev) => ({
        x: SPHERE_MATH.normalizeAngle(
          prev.x + clampRotationSpeed(rotationDelta.x),
        ),
        y: SPHERE_MATH.normalizeAngle(
          prev.y + clampRotationSpeed(rotationDelta.y),
        ),
        z: prev.z,
      }));
      setVelocity({
        x: clampRotationSpeed(rotationDelta.x),
        y: clampRotationSpeed(rotationDelta.y),
      });
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    },
    [dragSensitivity, clampRotationSpeed],
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastMousePos.current.x;
      const deltaY = touch.clientY - lastMousePos.current.y;
      dragDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);
      const rotationDelta = {
        x: -deltaY * dragSensitivity,
        y: deltaX * dragSensitivity,
      };
      setRotation((prev) => ({
        x: SPHERE_MATH.normalizeAngle(
          prev.x + clampRotationSpeed(rotationDelta.x),
        ),
        y: SPHERE_MATH.normalizeAngle(
          prev.y + clampRotationSpeed(rotationDelta.y),
        ),
        z: prev.z,
      }));
      setVelocity({
        x: clampRotationSpeed(rotationDelta.x),
        y: clampRotationSpeed(rotationDelta.y),
      });
      lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    },
    [dragSensitivity, clampRotationSpeed],
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const openPreview = useCallback((image: ImageData) => {
    // Ignore selection after a drag/spin so the modal does not stick open.
    if (dragDistanceRef.current > 8) return;
    setSelectedImage(image);
  }, []);

  const closePreview = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  // Close preview on scroll / Escape; lock body scroll while open.
  useEffect(() => {
    if (!selectedImage) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    const onScroll = () => closePreview();

    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [selectedImage, closePreview]);

  useEffect(() => {
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };
    if (isMounted) {
      animationFrame.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isMounted,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  const worldPositions = calculateWorldPositions();

  const renderImageNode = useCallback(
    (image: ImageData, index: number) => {
      const position = worldPositions[index];
      if (!position || !position.isVisible) return null;

      const imageSize = baseImageSize * position.scale;
      const isHovered = hoveredIndex === index;
      const finalScale = isHovered
        ? Math.min(hoverScale, hoverScale / position.scale)
        : 1;

      return (
        <div
          key={image.id}
          className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            left: `${containerSize / 2 + position.x}px`,
            top: `${containerSize / 2 + position.y}px`,
            opacity: position.fadeOpacity,
            transform: `translate(-50%, -50%) scale(${finalScale})`,
            zIndex: position.zIndex,
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setSelectedImage(image)}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/20 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              draggable={false}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </div>
        </div>
      );
    },
    [
      worldPositions,
      baseImageSize,
      containerSize,
      hoveredIndex,
      hoverScale,
    ],
  );

  if (!isMounted) {
    return (
      <div
        className="flex animate-pulse items-center justify-center rounded-lg bg-brand-50"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-brand-50/50"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-center text-muted-foreground">
          <p>No images provided</p>
          <p className="text-sm">Add images to the images prop</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className={`relative cursor-grab select-none active:cursor-grabbing ${className}`}
        style={{
          width: containerSize,
          height: containerSize,
          perspective: `${perspective}px`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="relative h-full w-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title ?? selectedImage.alt}
        >
          <div
            className="max-h-[90svh] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            {(selectedImage.title ||
              selectedImage.description ||
              selectedImage.href) && (
              <div className="p-6">
                {selectedImage.title ? (
                  <h3 className="mb-2 line-clamp-3 text-xl font-bold text-foreground">
                    {selectedImage.title}
                  </h3>
                ) : null}
                {selectedImage.description ? (
                  <p className="line-clamp-4 text-muted-foreground">
                    {selectedImage.description}
                  </p>
                ) : null}
                {selectedImage.href ? (
                  <Link
                    href={selectedImage.href}
                    className="mt-4 inline-flex rounded-full bg-[#FF9800] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FFA726]"
                    onClick={() => setSelectedImage(null)}
                  >
                    Read full article →
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SphereImageGrid;
