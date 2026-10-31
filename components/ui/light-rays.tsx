"use client";

import { useEffect, useRef } from "react";

/**
 * Soft volumetric light rays falling from the top edge, drawn by one tiny WebGL2
 * fragment shader (no libraries). Written to be cheap:
 *  - rendered at a fraction of the screen size (rays are soft, so nobody can tell),
 *  - the loop only runs while the canvas is on screen and the tab is visible,
 *  - reduced motion draws a single still frame,
 *  - no WebGL2 means it simply renders nothing and the CSS glow behind it remains.
 * The idea is the "Light Rays" background from React Bits; this is our own code.
 */

const VERT = `#version 300 es
void main() {
  // One oversized triangle that covers the screen, no vertex buffer needed.
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_shift;
uniform vec3 u_color;
uniform float u_intensity;
out vec4 outColor;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  // The light sits just above the top edge; y grows upward in GL.
  vec2 origin = vec2(0.5 + u_shift, 1.18);
  vec2 d = vec2((uv.x - origin.x) * aspect, uv.y - origin.y);
  float r = length(d);
  float a = atan(d.x, -d.y);             // 0 = straight down

  // Rays: a few bands of angle that drift slowly at different speeds.
  float t = u_time;
  float s1 = 0.5 + 0.5 * sin(a * 22.0 + t * 0.35 + sin(a * 6.0 - t * 0.22) * 1.6);
  float s2 = 0.5 + 0.5 * sin(a * 41.0 - t * 0.28 + sin(a * 11.0 + t * 0.17) * 1.2);
  float s3 = 0.5 + 0.5 * sin(a * 9.0 + t * 0.12);
  float rays = pow(s1 * (0.55 + 0.45 * s2) * (0.6 + 0.4 * s3), 1.6);

  float spread = 1.0 - smoothstep(0.05, 0.95, abs(a)); // fade out toward the sides
  float fall = exp(-r * 1.35);                      // fade with distance
  float core = exp(-r * 4.2) * 0.55;                // bright bloom at the source

  float v = (rays * spread * fall + core) * u_intensity;
  v += (hash(gl_FragCoord.xy + t) - 0.5) * 0.012;   // dither, hides banding
  v = clamp(v, 0.0, 1.0);
  if (v != v) v = 0.0;                                // never let a NaN paint the screen

  // Premultiplied alpha so it layers cleanly over the page.
  outColor = vec4(u_color * v, v);
}`;

type Props = {
  /** CSS hex colour of the light. */
  color?: string;
  intensity?: number;
  /** Fraction of the CSS size the canvas is drawn at. */
  scale?: number;
  /** How far the light leans toward the pointer (0 = not at all). */
  follow?: number;
  className?: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function LightRays({ color = "#ff6a3d", intensity = 0.95, scale = 0.5, follow = 0.12, className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const host = wrap.current;
    if (!el || !host) return;
    const gl = el.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const loc = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = loc("u_res");
    const uTime = loc("u_time");
    const uShift = loc("u_shift");
    const uColor = loc("u_color");
    const uInt = loc("u_intensity");
    const [r, g, b] = hexToRgb(color);
    gl.uniform3f(uColor, r, g, b);
    gl.uniform1f(uInt, intensity);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let onScreen = true;
    let tabVisible = !document.hidden;
    let shift = 0;
    let targetShift = 0;
    let start = performance.now();

    const resize = () => {
      const w = Math.max(2, Math.round(host.clientWidth * scale));
      const h = Math.max(2, Math.round(host.clientHeight * scale));
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const draw = (now: number) => {
      shift += (targetShift - shift) * 0.05;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uShift, shift);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      raf = 0;
      if (!onScreen || !tabVisible) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && !reduced && onScreen && tabVisible) raf = requestAnimationFrame(loop);
    };

    // If the browser ever drops the GPU context, hide the canvas rather than let a
    // dead one paint (the CSS glow behind it remains). The context is NOT lost on
    // cleanup: React re-runs this effect on the same canvas in development.
    const onLost = (ev: Event) => {
      ev.preventDefault();
      el.style.visibility = "hidden";
    };
    el.addEventListener("webglcontextlost", onLost);

    resize();
    draw(performance.now());
    kick();

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) {
        kick();
      }
    });
    io.observe(host);
    const onVis = () => {
      tabVisible = !document.hidden;
      if (tabVisible) kick();
    };
    document.addEventListener("visibilitychange", onVis);
    const onMove = (ev: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetShift = ((ev.clientX - rect.left) / rect.width - 0.5) * follow;
    };
    if (!reduced && follow > 0) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("webglcontextlost", onLost);
    };
  }, [color, intensity, scale, follow]);

  return (
    <div ref={wrap} aria-hidden className={["pointer-events-none", className].join(" ")}>
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
