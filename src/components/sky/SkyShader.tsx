"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/** WebGL color: RGB channels in 0–1. */
export type GlRgb = [number, number, number];

/** WebGL 0–1 RGB sky palette. */
export const SKY_SHADER_COLORS = {
  /** Base sky fill */
  baseColor: [151/ 255, 204 / 255, 222 / 255]  as GlRgb,
  /** Cloud body */
  cloudColor: [255 / 255, 242 / 255, 230 / 255] as GlRgb,
  /** Cloud highlight */
  cloudHighlightColor: [250 / 255, 244/255, 237 / 255] as GlRgb,
} as const;

export interface SkyShaderConfig {
  // ── Motion ──────────────────────────────────────────────────────
  /** Master animation speed (1 = default). */
  animationSpeed: number;
  /** Large blob layer drift (× animationSpeed). */
  driftSpeedSlow: number;
  /** Fine detail layer drift (× animationSpeed). */
  driftSpeedFast: number;
  /** Horizontal drift (+ right, − left). */
  driftDirectionX: number;
  /** Vertical drift (+ up, − down). */
  driftDirectionY: number;

  // ── Colors ──────────────────────────────────────────────────────
  /** Base sky fill — starting color across the canvas. */
  baseColor: GlRgb;
  /** Cloud body — mixed into slower, darker drift patches. */
  cloudColor: GlRgb;
  /** Cloud highlight — mixed into brighter drift patches. */
  cloudHighlightColor: GlRgb;

  // ── Blend strength ──────────────────────────────────────────────
  /** Cloud body visibility (0–1). */
  cloudStrength: number;
  /** Cloud highlight visibility (0–1). */
  cloudHighlightStrength: number;
  /** Film grain (0 = off, ~0.02 = subtle). */
  grain: number;

  // ── Cloud shape ─────────────────────────────────────────────────
  /** Blob scale (1 = default). Higher = larger clouds. */
  cloudSize: number;
  /** Edge softness multiplier (1 = default smoothstep half-width). */
  cloudEdgeBlur: number;
}

export const DEFAULT_SKY_SHADER_CONFIG: SkyShaderConfig = {
  animationSpeed: 0.75,
  driftSpeedSlow: 0.05,
  driftSpeedFast: 0.15,
  driftDirectionX: 1,
  driftDirectionY: 0.6,
  baseColor: SKY_SHADER_COLORS.baseColor,
  cloudColor: SKY_SHADER_COLORS.cloudColor,
  cloudHighlightColor: SKY_SHADER_COLORS.cloudHighlightColor,
  cloudStrength: 0.4,
  cloudHighlightStrength: 0.5,
  grain: 0.08,
  cloudSize: 1.2,
  cloudEdgeBlur: 1.8,
};

type SkyShaderProps = {
  config?: Partial<SkyShaderConfig>;
  className?: string;
  style?: CSSProperties;
  /** Single frame, no animation loop (e.g. prefers-reduced-motion). */
  paused?: boolean;
};

export function SkyShader({
  config: userConfig,
  className,
  style,
  paused = false,
}: SkyShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const configKey = JSON.stringify({
    ...DEFAULT_SKY_SHADER_CONFIG,
    ...userConfig,
  });

  useEffect(() => {
    const cfg = JSON.parse(configKey) as SkyShaderConfig;
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const gl =
      (canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn("SkyShader: WebGL not supported.");
      return;
    }

    const ctx = gl;

    const VERT = /* glsl */ `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const FRAG = /* glsl */ `
      precision highp float;

      uniform vec2  u_res;
      uniform float u_time;
      uniform float u_animationSpeed;
      uniform float u_driftSpeedSlow;
      uniform float u_driftSpeedFast;
      uniform vec2  u_driftDirection;
      uniform vec3  u_baseColor;
      uniform vec3  u_cloudColor;
      uniform vec3  u_cloudHighlightColor;
      uniform float u_cloudStrength;
      uniform float u_cloudHighlightStrength;
      uniform float u_grain;
      uniform float u_cloudSize;
      uniform float u_cloudEdgeBlur;

      // Hash + noise: use a Hoskins-style hash to avoid lattice/diagonal artifacts.
      // Value noise is still "soft" but we rotate/warp between octaves to break grid alignment.
      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        // Quintic curve (smoother than cubic) reduces interpolation line visibility.
        vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
        float a = hash12(i);
        float b = hash12(i + vec2(1.0, 0.0));
        float c = hash12(i + vec2(0.0, 1.0));
        float d = hash12(i + vec2(1.0, 1.0));
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      mat2 rot2(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.55;
        // Rotate each octave so the underlying grid doesn't show up at any one scale.
        mat2 r = rot2(0.65);
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p = (r * p) * 2.03 + vec2(17.3, 9.2);
          a *= 0.5;
        }
        return v;
      }

      // Tiny domain warp for more organic, cloud-like diffusion.
      vec2 warp(vec2 p) {
        float w1 = fbm(p * 0.85 + vec2(8.2, 1.3));
        float w2 = fbm(p * 0.85 + vec2(2.7, 9.2));
        return vec2(w1, w2);
      }

      void main() {
        float ar = u_res.x / u_res.y;
        vec2 uv = gl_FragCoord.xy / u_res;
        vec2 st = vec2(uv.x * ar, uv.y);

        float t = u_time * u_animationSpeed;
        vec2 dir = normalize(u_driftDirection);

        vec2 flowSlow = st + dir * t * u_driftSpeedSlow;
        vec2 flowFast = st + dir * t * u_driftSpeedFast;

        float size = max(u_cloudSize, 0.5);
        vec2 slowP = flowSlow * (2.2 / size) + vec2(t * 0.05, t * 0.03);
        vec2 fastP = flowFast * (4.5 / size) + vec2(t * 0.02, t * 0.08);

        slowP += 0.22 * warp(slowP);
        fastP += 0.18 * warp(fastP + 3.1);

        float blobSlow = fbm(slowP);
        float blobFast = fbm(fastP + vec2(fbm(flowFast * (1.1 / size)) * 1.1, 0.0));
        float bloom = blobSlow * 0.5 + blobFast * 0.5;

        float blur = max(u_cloudEdgeBlur, 0.01);
        float cloudHighlightMask = smoothstep(0.515 - 0.135 * blur, 0.515 + 0.135 * blur, blobSlow)
                                 * smoothstep(0.475 + 0.125 * blur, 0.475 - 0.125 * blur, blobFast);
        float cloudMask = smoothstep(0.52 - 0.10 * blur, 0.52 + 0.10 * blur, bloom);

        vec3 col = u_baseColor;
        col = mix(col, u_cloudColor, cloudMask * u_cloudStrength);
        col = mix(col, u_cloudHighlightColor, cloudHighlightMask * u_cloudHighlightStrength);

        // Screen-space grain + dithering: helps hide 8-bit gradient banding without revealing a grid.
        // Use pixel coords (not uv) so grain doesn't "swim" with resizes.
        float g = hash12(gl_FragCoord.xy + vec2(t * 60.0, t * 17.0)) - 0.5;
        col += u_grain * g;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compileShader(type: number, src: string): WebGLShader {
      const s = ctx.createShader(type)!;
      ctx.shaderSource(s, src);
      ctx.compileShader(s);
      if (!ctx.getShaderParameter(s, ctx.COMPILE_STATUS)) {
        console.error("Shader compile error:", ctx.getShaderInfoLog(s));
      }
      return s;
    }

    const prog = ctx.createProgram()!;
    ctx.attachShader(prog, compileShader(ctx.VERTEX_SHADER, VERT));
    ctx.attachShader(prog, compileShader(ctx.FRAGMENT_SHADER, FRAG));
    ctx.linkProgram(prog);
    if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
      console.error("Program link error:", ctx.getProgramInfoLog(prog));
    }
    ctx.useProgram(prog);

    const buf = ctx.createBuffer()!;
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      ctx.STATIC_DRAW,
    );
    const aPos = ctx.getAttribLocation(prog, "a_pos");
    ctx.enableVertexAttribArray(aPos);
    ctx.vertexAttribPointer(aPos, 2, ctx.FLOAT, false, 0, 0);

    const u = {
      res: ctx.getUniformLocation(prog, "u_res"),
      time: ctx.getUniformLocation(prog, "u_time"),
      animationSpeed: ctx.getUniformLocation(prog, "u_animationSpeed"),
      driftSpeedSlow: ctx.getUniformLocation(prog, "u_driftSpeedSlow"),
      driftSpeedFast: ctx.getUniformLocation(prog, "u_driftSpeedFast"),
      driftDirection: ctx.getUniformLocation(prog, "u_driftDirection"),
      baseColor: ctx.getUniformLocation(prog, "u_baseColor"),
      cloudColor: ctx.getUniformLocation(prog, "u_cloudColor"),
      cloudHighlightColor: ctx.getUniformLocation(prog, "u_cloudHighlightColor"),
      cloudStrength: ctx.getUniformLocation(prog, "u_cloudStrength"),
      cloudHighlightStrength: ctx.getUniformLocation(prog, "u_cloudHighlightStrength"),
      grain: ctx.getUniformLocation(prog, "u_grain"),
      cloudSize: ctx.getUniformLocation(prog, "u_cloudSize"),
      cloudEdgeBlur: ctx.getUniformLocation(prog, "u_cloudEdgeBlur"),
    };

    let startTime: number | null = null;

    function draw(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = paused ? 0 : (ts - startTime) / 1000;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }

      ctx.viewport(0, 0, W, H);
      ctx.uniform2f(u.res, W, H);
      ctx.uniform1f(u.time, elapsed);
      ctx.uniform1f(u.animationSpeed, cfg.animationSpeed);
      ctx.uniform1f(u.driftSpeedSlow, cfg.driftSpeedSlow);
      ctx.uniform1f(u.driftSpeedFast, cfg.driftSpeedFast);
      ctx.uniform2f(u.driftDirection, cfg.driftDirectionX, cfg.driftDirectionY);
      ctx.uniform3fv(u.baseColor, cfg.baseColor);
      ctx.uniform3fv(u.cloudColor, cfg.cloudColor);
      ctx.uniform3fv(u.cloudHighlightColor, cfg.cloudHighlightColor);
      ctx.uniform1f(u.cloudStrength, cfg.cloudStrength);
      ctx.uniform1f(u.cloudHighlightStrength, cfg.cloudHighlightStrength);
      ctx.uniform1f(u.grain, cfg.grain);
      ctx.uniform1f(u.cloudSize, cfg.cloudSize);
      ctx.uniform1f(u.cloudEdgeBlur, cfg.cloudEdgeBlur);

      ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, 4);
    }

    function frame(ts: number) {
      draw(ts);
      if (!paused) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }

    rafRef.current = requestAnimationFrame(frame);

    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame((ts) => {
        draw(ts);
        if (!paused) rafRef.current = requestAnimationFrame(frame);
      });
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      ctx.deleteProgram(prog);
      ctx.deleteBuffer(buf);
    };
  }, [paused, configKey]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
