import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, Zap } from 'lucide-react';

const LiveTypingDemo = () => {
    const [text, setText] = useState('');
    const [pulses, setPulses] = useState([]);
    const [lastKeystroke, setLastKeystroke] = useState(Date.now());
    const [velocity, setVelocity] = useState(0);
    const [confidence, setConfidence] = useState(45);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeout = useRef(null);

    const handleTyping = (e) => {
        const value = e.target.value;
        const now = Date.now();
        const delay = now - lastKeystroke;
        
        setIsTyping(true);
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => setIsTyping(false), 2000);
        
        // Cap delay to prevent anomalies
        const cappedDelay = Math.min(delay, 500); 
        
        // Height calculation: faster typing (lower delay) = taller pulse. 
        const heightPercentage = Math.max(20, 100 - (cappedDelay / 5)); 
        
        const newPulse = {
            id: now + Math.random(),
            height: heightPercentage,
            color: value.length % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-500', 
            glow: value.length % 2 === 0 ? 'shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'shadow-[0_0_15px_rgba(168,85,247,0.5)]'
        };

        setPulses(prev => [...prev, newPulse].slice(-35));
        setText(value);
        setLastKeystroke(now);
        
        // Simulated Keys Per Second
        setVelocity(Math.round((1000 / (cappedDelay + 1)) * 10) / 10);

        // Increase confidence fluidly as they type
        setConfidence(prev => Math.min(prev + (Math.random() * 2 + 0.5), 99.9));
    };

    return (
        <section id="demo" className="relative py-28 px-6 z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">

                    <h2 className="font-sora font-bold text-3xl md:text-5xl mb-4 text-white">
                        Your Behavior is <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Your Password</span>
                    </h2>
                    <p className="text-white/60 font-dm text-base max-w-xl mx-auto">
                        We're already learning you. Type naturally below to see your unique keystroke rhythm visualized.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* Left: Terminal Input & waveform (takes up 3 cols) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="lg:col-span-3 glass p-6 md:p-8 rounded-[24px] border border-white/10 bg-white/[0.02] flex flex-col relative overflow-hidden"
                    >
                        {/* Fake Mac Header */}
                        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                            <span className="ml-4 font-mono text-[10px] text-white/70 uppercase tracking-widest flex items-center gap-2">
                                Neural Link <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`}></span>
                            </span>
                        </div>

                        <textarea 
                            value={text}
                            onChange={handleTyping}
                            placeholder="Start typing a sentence here. Don't stop. Watch the patterns emerge..."
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-5 min-h-[160px] text-white font-mono text-sm leading-relaxed outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/40 transition-all resize-none shadow-inner placeholder:text-white/50"
                        />

                        {/* Live Waveform Generation */}
                        <div className="mt-6 flex flex-col">
                            <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest mb-3">Keystroke Rhythm</span>
                            <div className="h-28 bg-black/50 rounded-xl border border-white/5 p-4 flex items-end justify-start gap-[5px] overflow-hidden relative">
                                <AnimatePresence initial={false}>
                                    {pulses.map((p, i) => (
                                        <motion.div
                                            key={p.id}
                                            initial={{ height: 0, opacity: 0, y: 10 }}
                                            animate={{ height: `${p.height}%`, opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, width: 0, margin: 0 }}
                                            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                                            className={`w-[6px] sm:w-[8px] rounded-t-sm ${p.color} ${p.glow} flex-shrink-0`}
                                        />
                                    ))}
                                </AnimatePresence>
                                {pulses.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/60 animate-pulse">
                                        Awaiting input stream...
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Trust Score & Live Data (takes up 2 cols) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="lg:col-span-2 glass p-6 md:p-8 rounded-[24px] border border-white/10 bg-white/[0.02] flex flex-col justify-center items-center"
                    >
                        <div className="mb-12 w-full flex flex-col items-center relative">
                            {/* SVG Trust Gauge */}
                            <div className="relative w-56 h-56 flex flex-col items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
                                    <motion.circle 
                                        cx="50" cy="50" r="45" fill="none" 
                                        stroke="url(#trustGradient)" strokeWidth="6"
                                        strokeDasharray="282.7"
                                        animate={{ strokeDashoffset: 282.7 - (282.7 * confidence) / 100 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        strokeLinecap="round"
                                        style={{ filter: 'drop-shadow(0px 0px 8px rgba(139, 92, 246, 0.4))' }}
                                    />
                                    <defs>
                                        <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#00E5A0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <motion.span 
                                    className="font-sora font-bold text-5xl text-white relative z-10 block"
                                    animate={{ scale: isTyping ? [1, 1.05, 1] : 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {confidence.toFixed(1)}<span className="text-2xl text-white/80">%</span>
                                </motion.span>
                                <span className="font-dm text-xs text-white/80 mt-2 uppercase tracking-widest block relative z-10 text-center">Pattern Confidence</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-black/30 rounded-xl p-5 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Zap size={28}/></div>
                                <p className="font-mono text-[9px] text-white/70 uppercase mb-2 tracking-widest">Typing Velocity</p>
                                <p className="font-dm font-bold text-3xl text-cyan-400">
                                    {isTyping ? velocity : '0.0'} <span className="text-xs text-white/60 font-mono tracking-normal">kps</span>
                                </p>
                            </div>
                            <div className="bg-black/30 rounded-xl p-5 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Activity size={28}/></div>
                                <p className="font-mono text-[9px] text-white/70 uppercase mb-2 tracking-widest">Profile Status</p>
                                <p className={`font-dm font-bold text-sm sm:text-base mt-2 flex items-center gap-2 ${confidence > 80 ? 'text-emerald-400' : 'text-purple-400'}`}>
                                    <span className={`w-2 h-2 rounded-full ${confidence > 80 ? 'bg-emerald-400' : 'bg-purple-400 animate-pulse'}`}></span>
                                    {confidence > 80 ? 'Verified' : 'Analyzing'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LiveTypingDemo;
