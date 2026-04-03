import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { dummyUser } from '../data/dummy';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [trustScore, setTrustScore] = useState(0.85);
  const [isEnrolled, setIsEnrolled] = useState(true);
  const [sessionEvents, setSessionEvents] = useState([]);
  const [keystrokes, setKeystrokes] = useState([]);

  // Keystroke collector
  const lastKeyTime = useRef(Date.now());
  const keyDownTime = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      const now = Date.now();
      keyDownTime.current[e.key] = now;
      const flightTime = now - lastKeyTime.current;
      
      setKeystrokes(prev => {
        const next = [...prev, { key: e.key, flightTime, timestamp: now }];
        if (next.length > 50) return next.slice(-50);
        return next;
      });
      
      lastKeyTime.current = now;
    };

    const handleKeyUp = (e) => {
      const now = Date.now();
      const startTime = keyDownTime.current[e.key];
      if (startTime) {
        const holdTime = now - startTime;
        setKeystrokes(prev => {
          const last = prev[prev.length - 1];
          if (last && last.key === e.key) {
            const updated = [...prev];
            updated[updated.length - 1].holdTime = holdTime;
            return updated;
          }
          return prev;
        });
        delete keyDownTime.current[e.key];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Live trust score simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTrustScore(prev => {
        const drift = (Math.random() - 0.48) * 0.04;
        const next = Math.max(0, Math.min(1, prev + drift));
        return parseFloat(next.toFixed(2));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scoring every 10 keystrokes
  useEffect(() => {
    if (keystrokes.length > 0 && keystrokes.length % 10 === 0) {
      setTrustScore(prev => {
        const adjustment = (Math.random() - 0.48) * 0.08;
        const next = Math.max(0, Math.min(1, prev + adjustment));
        return parseFloat(next.toFixed(2));
      });
    }
  }, [keystrokes.length]);

  const riskLevel = trustScore > 0.6 ? 'safe' : (trustScore > 0.35 ? 'watch' : 'danger');

  const login = (email, password) => {
    // Dummy login
    localStorage.setItem('behaveguard_token', 'dummy_token');
    setUser(dummyUser);
  };

  const logout = () => {
    localStorage.removeItem('behaveguard_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, setUser, trustScore, setTrustScore, riskLevel, isEnrolled, setIsEnrolled,
      sessionEvents, setSessionEvents, keystrokes, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
