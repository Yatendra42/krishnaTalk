"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

interface SmoothScrollingProps {
  children: React.ReactNode;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
