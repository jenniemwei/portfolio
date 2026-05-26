"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/** WebGL color: RGB channels in 0–1. */
export type GlRgb = [number, number, number];

/** WebGL 0–1 RGB sky palette (fixed; not part of public config). */
export const SKY_SHADER_COLORS = {
  baseColor: [180 / 255, 226 / 255, 235 / 255] as GlRgb,
  cloudColor: [253 / 255, 248 / 255, 245 / 255] as GlRgb,
  cloudHighlightColor: [255 / 255, 238 / 255, 230/ 255] as GlRgb,
} as const;

/** Motion + grain — fixed; tune clouds via `SkyShaderConfig` only. */
const SKY_SHADER_MOTION = {
  animationSpeed: 0.2,
  driftSpeedSlow: 0.08,
  driftSpeedFast: 0.5,
  driftDirectionX: -1,
  driftDirectionY: 0.4,
  grain: 0.09,
} as const;

/** Public tuning dials — all values are **0–1** (clamped in shader). */
export interface SkyShaderConfig {
  /** Cloud area: 0 = sparse sky, 1 = heavy cover. */
  cloudCoverage: number;
  /** Cloud body opacity where clouds exist. */
  baseAmt: number;
  /** Warm highlight strength on peaks. */
  highlightAmt: number;
  /** Blob scale: 0 = small/busy, 1 = large/soft. */
  cloudSize: number;
  /** Edge softness: 0 = crisp, 1 = very soft. */
  edgeBlur: number;
  /** Swirl / domain warp: 0 = off, 1 = strong. */
  warp: number;
}

export const DEFAULT_SKY_SHADER_CONFIG: SkyShaderConfig = {
  cloudCoverage: 0.3,
  baseAmt: 0.9,
  highlightAmt: 0.5,
  cloudSize: .85,
  edgeBlur: .8,
  warp: 0.5,
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

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
      uniform float u_baseAmt;
      uniform float u_highlightAmt;
      uniform float u_grain;
      uniform float u_cloudCoverage;
      uniform float u_cloudSize;
      uniform float u_edgeBlur;
      uniform float u_warp;

      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
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
        mat2 r = rot2(0.65);
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p = (r * p) * 2.03 + vec2(17.3, 9.2);
          a *= 0.5;
        }
        return v;
      }

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

        float cloudSize01 = clamp(u_cloudSize, 0.0, 1.0);
        float edgeBlur01 = clamp(u_edgeBlur, 0.0, 1.0);
        float warp01 = clamp(u_warp, 0.0, 1.0);
        float size = mix(0.4, 2.0, cloudSize01);
        float warpAmt = mix(0.0, 0.45, warp01);

        vec2 slowP = flowSlow * (2.2 / size) + vec2(t * 0.05, t * 0.03);
        vec2 fastP = flowFast * (4.5 / size) + vec2(t * 0.02, t * 0.08);

        slowP += warpAmt * warp(slowP);
        fastP += warpAmt * 0.818181818 * warp(fastP + 3.1);

        float blobSlow = fbm(slowP);
        float blobFast = fbm(fastP + vec2(fbm(flowFast * (1.1 / size)) * 1.1, 0.0));
        float bloom = blobSlow * 0.5 + blobFast * 0.5;

        float coverage = clamp(u_cloudCoverage, 0.0, 1.0);
        float baseAmt = clamp(u_baseAmt, 0.0, 1.0);
        float highlightAmt = clamp(u_highlightAmt, 0.0, 1.0);
        // High center = sparse clouds (sky shows); low center = more coverage.
        float cloudCenter = mix(0.68, 0.44, coverage);
        float presenceEdge = mix(0.025, 0.28, edgeBlur01);
        float hiHalfSlow = mix(0.03, 0.34, edgeBlur01);
        float hiHalfFast = mix(0.025, 0.3, edgeBlur01);
        float hiOffset = mix(0.12, -0.12, coverage);

        float rawPresence = smoothstep(cloudCenter - presenceEdge, cloudCenter + presenceEdge, bloom);
        // Crush weak values so noise valleys stay sky blue, not a uniform haze.
        float presence = pow(rawPresence, mix(2.4, 1.35, coverage));

        float highlightField = smoothstep(0.515 + hiOffset - hiHalfSlow, 0.515 + hiOffset + hiHalfSlow, blobSlow)
                             * smoothstep(0.475 + hiOffset + hiHalfFast, 0.475 + hiOffset - hiHalfFast, blobFast);
        highlightField = pow(clamp(highlightField, 0.0, 1.0), 1.4);

        vec3 col = u_baseColor;
        float baseLayer = clamp(presence * baseAmt, 0.0, 1.0);
        col = mix(col, u_cloudColor, baseLayer);
        // Highlights only on strong peaks — not scaled by full presence (was washing the whole sky).
        float hiLayer = clamp(highlightField * highlightAmt, 0.0, 0.72);
        col = mix(col, u_cloudHighlightColor, hiLayer);

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
      baseAmt: ctx.getUniformLocation(prog, "u_baseAmt"),
      highlightAmt: ctx.getUniformLocation(prog, "u_highlightAmt"),
      grain: ctx.getUniformLocation(prog, "u_grain"),
      cloudCoverage: ctx.getUniformLocation(prog, "u_cloudCoverage"),
      cloudSize: ctx.getUniformLocation(prog, "u_cloudSize"),
      edgeBlur: ctx.getUniformLocation(prog, "u_edgeBlur"),
      warp: ctx.getUniformLocation(prog, "u_warp"),
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
      ctx.uniform1f(u.animationSpeed, SKY_SHADER_MOTION.animationSpeed);
      ctx.uniform1f(u.driftSpeedSlow, SKY_SHADER_MOTION.driftSpeedSlow);
      ctx.uniform1f(u.driftSpeedFast, SKY_SHADER_MOTION.driftSpeedFast);
      ctx.uniform2f(
        u.driftDirection,
        SKY_SHADER_MOTION.driftDirectionX,
        SKY_SHADER_MOTION.driftDirectionY,
      );
      ctx.uniform3fv(u.baseColor, SKY_SHADER_COLORS.baseColor);
      ctx.uniform3fv(u.cloudColor, SKY_SHADER_COLORS.cloudColor);
      ctx.uniform3fv(u.cloudHighlightColor, SKY_SHADER_COLORS.cloudHighlightColor);
      ctx.uniform1f(u.baseAmt, clamp01(cfg.baseAmt));
      ctx.uniform1f(u.highlightAmt, clamp01(cfg.highlightAmt));
      ctx.uniform1f(u.grain, SKY_SHADER_MOTION.grain);
      ctx.uniform1f(u.cloudCoverage, clamp01(cfg.cloudCoverage));
      ctx.uniform1f(u.cloudSize, clamp01(cfg.cloudSize));
      ctx.uniform1f(u.edgeBlur, clamp01(cfg.edgeBlur));
      ctx.uniform1f(u.warp, clamp01(cfg.warp));

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
