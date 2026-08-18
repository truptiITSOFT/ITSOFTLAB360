"use client";

import { useEffect, useRef } from "react";

interface TransparentVideoProps {
  src: string;
  startTime?: number;
  className?: string;
}

export default function TransparentVideo({ src, startTime = 0, className = "" }: TransparentVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Use willReadFrequently to optimize for pixel manipulation
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;

    const drawFrame = () => {
      if (video.paused || video.ended) {
        animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }
      
      // Set canvas size to match video resolution exactly
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth || 800;
        canvas.height = video.videoHeight || 600;
      }
      
      // Draw the current video frame onto the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get the image data for pixel manipulation
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      // Sample top-left pixel to use as the background color key
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      // Make pixels that match the background color transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Calculate Euclidean distance from the background color
        const dist = Math.sqrt(Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2));
        
        // Tolerance for background matching (adjust if needed)
        if (dist < 45) {
          // Soft edge blending for pixels near the threshold
          if (dist > 25) {
            data[i + 3] = Math.floor(255 * ((dist - 25) / 20)); // partial transparency
          } else {
            data[i + 3] = 0; // fully transparent
          }
        }
      }

      // Put the modified pixels back onto the canvas
      ctx.putImageData(frame, 0, 0);
      
      // Request next frame
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    video.addEventListener("play", handlePlay);

    if (startTime > 0) {
      video.currentTime = startTime;
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      cancelAnimationFrame(animationFrameId);
    };
  }, [startTime]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="hidden" // Hides the original video so only the transparent canvas shows
      />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
