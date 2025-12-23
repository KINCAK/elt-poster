'use client';
import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#6B8E8E',
  trailCount = 4,
  sizes = [60, 125, 75, 50],
  innerSizes = [20, 35, 25, 15],
  innerColor = 'rgba(255,255,255,0.4)',
  opacities = [0.4, 0.3, 0.2, 0.1],
  shadowColor = 'rgba(0,0,0,0.1)',
  shadowBlur = 5,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  zIndex = 0
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(e => {
    const { left, top } = updateOffset();
    const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    blobsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        x: x - left,
        y: y - top,
        duration: i === 0 ? fastDuration : slowDuration,
        ease: i === 0 ? 'power3.out' : 'power1.out'
      });
    });
  }, [updateOffset, fastDuration, slowDuration]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMove]);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex, pointerEvents: 'none' }}>
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={filterStdDeviation} result="blur" />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => (blobsRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: sizes[i],
              height: sizes[i],
              borderRadius: '50%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              filter: useFilter ? `url(#${filterId})` : undefined,
              willChange: 'transform'
            }}
          />
        ))}
      </div>
    </div>
  );
}