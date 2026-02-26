
"use client"

import React, { useEffect, useRef } from 'react';
import { useResort } from './ResortContext';

const TOTAL_FRAMES = 105;
const FRAME_START = 0;
const FRAME_END = 104;
const BASE_URL = 'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/resorts/';

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_texCoord = a_texCoord;
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  uniform sampler2D u_image;
  varying vec2 v_texCoord;
  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord);
  }
`;

export function WebGLHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollProgress, setLoadProgress, isChanging } = useResort();
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  // Progressive Loading
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = FRAME_START; i <= FRAME_END; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `${BASE_URL}frame_${frameNum}_delay-0.04s.webp`;
      img.onload = () => {
        loaded++;
        setLoadProgress((loaded / TOTAL_FRAMES) * 100);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [setLoadProgress]);

  // WebGL Initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: true });
    if (!gl) return;
    glRef.current = gl;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 1,  1, 1,  0, 0,
      0, 0,  1, 1,  1, 0,
    ]), gl.STATIC_DRAW);

    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    textureRef.current = texture;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rendering Loop
  useEffect(() => {
    const gl = glRef.current;
    if (!gl) return;

    let rafId: number;
    const render = () => {
      // frameIndex = Math.floor(progress * 104)
      const frameIndex = Math.min(FRAME_END, Math.max(0, Math.floor(scrollProgress * FRAME_END)));
      const img = imagesRef.current[frameIndex];

      if (img && img.complete) {
        gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      rafId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(rafId);
  }, [scrollProgress]);

  return (
    <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background/20 pointer-events-none" />
    </div>
  );
}
