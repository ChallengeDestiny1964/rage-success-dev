"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Signal = { a: number; b: number; t: number; speed: number };

const LINK_DISTANCE = 150;
const POINTER_RADIUS = 200;

export function SiteBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999, active: false };
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let signals: Signal[] = [];
    let frame = 0;
    let pointerFrame = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(95, Math.max(32, (width * height) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.9,
      }));
      signals = [];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        if (!reducedMotion) {
          if (pointer.active) {
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            const dist = Math.hypot(dx, dy);
            if (dist < POINTER_RADIUS && dist > 0.01) {
              const pull = (1 - dist / POINTER_RADIUS) * 0.012;
              node.vx += (dx / dist) * pull;
              node.vy += (dy / dist) * pull;
            }
          }
          node.vx *= 0.985;
          node.vy *= 0.985;
          const speed = Math.hypot(node.vx, node.vy);
          if (speed < 0.06) {
            node.vx += (Math.random() - 0.5) * 0.02;
            node.vy += (Math.random() - 0.5) * 0.02;
          }
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.16;
            ctx.strokeStyle = `rgba(10, 96, 100, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            if (!reducedMotion && signals.length < 14 && Math.random() < 0.00035) {
              signals.push({ a: i, b: j, t: 0, speed: 0.008 + Math.random() * 0.012 });
            }
          }
        }

        if (pointer.active) {
          const dist = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (dist < POINTER_RADIUS) {
            const alpha = (1 - dist / POINTER_RADIUS) * 0.32;
            ctx.strokeStyle = `rgba(14, 124, 128, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = "rgba(14, 124, 128, 0.55)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }

      signals = signals.filter((signal) => {
        const a = nodes[signal.a];
        const b = nodes[signal.b];
        if (!a || !b || Math.hypot(a.x - b.x, a.y - b.y) > LINK_DISTANCE * 1.2) return false;
        signal.t += signal.speed;
        if (signal.t >= 1) return false;
        const x = a.x + (b.x - a.x) * signal.t;
        const y = a.y + (b.y - a.y) * signal.t;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 7);
        glow.addColorStop(0, "rgba(20, 170, 175, 0.9)");
        glow.addColorStop(1, "rgba(20, 170, 175, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reducedMotion) draw();
      else frame = requestAnimationFrame(loop);
    };

    const onResize = () => {
      seed();
      start();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        root.style.setProperty("--spot-x", `${pointer.x}px`);
        root.style.setProperty("--spot-y", `${pointer.y}px`);
        root.style.setProperty("--spot-opacity", "1");
      });
    };

    const onPointerLeave = () => {
      pointer.active = false;
      root.style.setProperty("--spot-opacity", "0");
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };

    seed();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className="site-bg" aria-hidden>
      <div className="site-bg-aurora">
        <span className="aurora-blob aurora-a" />
        <span className="aurora-blob aurora-b" />
        <span className="aurora-blob aurora-c" />
        <span className="aurora-blob aurora-d" />
      </div>
      <div className="site-bg-grid" />
      <canvas ref={canvasRef} className="site-bg-canvas" />
      <div className="site-bg-spotlight" />
      <div className="site-bg-vignette" />
      <div className="site-bg-grain" />
    </div>
  );
}
