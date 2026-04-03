import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/Shared';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', pin: ['', '', '', '', '', ''], otp: ['', '', '', '', '', ''] });
  const { setTrustScore, setIsEnrolled } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setIsEnrolled(false);
      setTrustScore(0.7);
      navigate('/dashboard');
    }
  };

  const updatePin = (idx, val) => {
    if (val.length > 1) return;
    const newPin = [...formData.pin];
    newPin[idx] = val;
    setFormData({ ...formData, pin: newPin });
  };

  const updateOtp = (idx, val) => {
    if (val.length > 1) return;
    const newOtp = [...formData.otp];
    newOtp[idx] = val;
    setFormData({ ...formData, otp: newOtp });
  };

  return (
    <div className="min-h-screen bg-bg-deep text-white flex flex-col items-center justify-center p-8 relative">
      <div className="bg-mesh">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
            <Shield className="text-white" size={28} />
          </div>
          <h2 className="font-sora font-extrabold text-3xl">Create Secure Account</h2>
          <p className="text-secondary mt-2">Zero-knowledge behavioural enrolment starts now.</p>
        </div>

        {/* Progress Tracker */}
        <div className="relative mb-16 px-10">
          <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-white/10 -translate-y-1/2">
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${(step - 1) * 50}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="relative flex justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all duration-500 ${step >= s ? 'bg-accent text-white' : 'bg-bg-card border-2 border-white/10 text-secondary'}`}>
                  {s}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest mt-3 transition-colors ${step >= s ? 'text-accent' : 'text-secondary'}`}>
                  {s === 1 ? 'Profile' : s === 2 ? 'PIN' : 'Verify'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <GlassCard className="p-10 border-white/5">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">Full Name</label>
                  <input type="text" placeholder="Rahul Mehta" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all" />
                </div>
                 <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">Email Address</label>
                  <input type="email" placeholder="rahul.mehta@gmail.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all" />
              </div>
              <p className="text-secondary text-xs italic opacity-70">Note: Your typing pattern (speed, flight time) is being observed to create your behavioural baseline.</p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center">
              <h3 className="font-sora font-bold text-xl mb-6">Create 6-digit Transaction PIN</h3>
              <div className="flex justify-center gap-3">
                {formData.pin.map((p, i) => (
                  <input 
                    key={i} 
                    type="password" 
                    value={p}
                    onChange={(e) => updatePin(i, e.target.value)}
                    className="w-12 h-16 bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-bold focus:ring-2 focus:ring-accent transition-all animate-pulse-slow" 
                    maxLength={1}
                  />
                ))}
              </div>
              <p className="text-secondary text-sm mt-8">This PIN is used as an additional layer for high-risk operations.</p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center">
              <h3 className="font-sora font-bold text-xl mb-2">Verification</h3>
              <p className="text-secondary mb-8">We've sent a 6-digit OTP to r***@gmail.com</p>
              <div className="flex justify-center gap-3 mb-8">
                {formData.otp.map((p, i) => (
                  <input 
                    key={i} 
                    type="text" 
                    value={p}
                    onChange={(e) => updateOtp(i, e.target.value)}
                    className="w-12 h-16 bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-bold focus:ring-2 focus:ring-accent transition-all" 
                    maxLength={1}
                  />
                ))}
              </div>
              <button className="text-accent font-bold hover:underline mb-10 block mx-auto">Resend OTP in 54s</button>
            </motion.div>
          )}

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="order-2 md:order-1 px-10 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors">Back</button>
            )}
            <button 
              onClick={handleNext} 
              className="flex-1 order-1 md:order-2 bg-gradient-to-r from-accent to-accent-violet py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all flex items-center justify-center space-x-2"
            >
              <span>{step === 3 ? 'Activate Security' : 'Continue'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </GlassCard>

        <p className="text-center text-secondary text-sm mt-8">
          By continuing, you agree to our <span className="text-accent underline cursor-pointer">Security Protocol & Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
