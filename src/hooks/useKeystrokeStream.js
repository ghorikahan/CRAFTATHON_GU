'use client';
import { useEffect, useRef } from 'react';

const useKeystrokeStream = ({ userId, sessionId }) => {
  const lastKeyTime = useRef(Date.now());
  const buffer = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e) => {
      const now = Date.now();
      const delay = now - lastKeyTime.current;
      lastKeyTime.current = now;

      buffer.current.push({ 
        key: e.key, 
        delay, 
        timestamp: now,
        type: 'keydown'
      });

      if (buffer.current.length >= 20) {
        // In a real app, send telemetry to WebSocket/API here
        // console.log('Telemetry batch ready for:', { userId, sessionId }, buffer.current);
        buffer.current = [];
      }
    };

    const handleMouseMove = (e) => {
      // Basic rate limiting for mouse moves
      const now = Date.now();
      if (now - lastKeyTime.current > 100) {
        buffer.current.push({
          x: e.clientX,
          y: e.clientY,
          timestamp: now,
          type: 'mousemove'
        });
        lastKeyTime.current = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [userId, sessionId]);
};

export default useKeystrokeStream;
