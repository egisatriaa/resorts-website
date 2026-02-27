'use client';

import React, { useEffect, useRef } from 'react';
import { useResort } from './ResortContext';

const TOTAL_FRAMES = 105;
const FRAME_START = 0;
const FRAME_END = 104;
const BASE_URL =
    'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/resorts/';

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

    // Progressive Loading with CORS support
    useEffect(() => {
        let loaded = 0;
        const images: HTMLImageElement[] = [];

        for (let i = FRAME_START; i <= FRAME_END; i++) {
            const img = new Image();
            // Critical: Enable CORS for WebGL texture operations
            img.crossOrigin = 'anonymous';
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
        const gl = canvas.getContext('webgl', {
            alpha: false,
            antialias: true,
        });
        if (!gl) return;
        glRef.current = gl;

        const createShader = (
            gl: WebGLRenderingContext,
            type: number,
            source: string,
        ) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const vertexShader = createShader(
            gl,
            gl.VERTEX_SHADER,
            VERTEX_SHADER_SOURCE,
        );
        const fragmentShader = createShader(
            gl,
            gl.FRAGMENT_SHADER,
            FRAGMENT_SHADER_SOURCE,
        );
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        programRef.current = program;

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW,
        );

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
            gl.STATIC_DRAW,
        );

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
            // Calculate scroll progress directly! ZERO React states = ZERO rendering overhead
            const scroll = window.scrollY || 0;
            const hero = document.getElementById('hero');
            const heroHeight = hero
                ? hero.offsetHeight
                : window.innerHeight * 4;
            const scrollableDistance = Math.max(
                heroHeight - window.innerHeight,
                1,
            );
            const calculatedProgress = Math.min(
                Math.max(scroll / scrollableDistance, 0),
                1,
            );

            // Map scroll progress (0-1) to frame index (0-104)
            const frameIndex = Math.min(
                FRAME_END,
                Math.max(0, Math.floor(calculatedProgress * FRAME_END)),
            );
            const img = imagesRef.current[frameIndex];

            if (img && img.complete) {
                gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
                // Upload the selected frame to the GPU texture
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    0,
                    gl.RGBA,
                    gl.RGBA,
                    gl.UNSIGNED_BYTE,
                    img,
                );
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
            rafId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isChanging ? 'opacity-0' : 'opacity-100'}`}
        >
            <canvas ref={canvasRef} className="w-full h-full" />

            {/* Subtle Cinematic Scrim */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.35) 100%)',
                }}
            />
        </div>
    );
}
