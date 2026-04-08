import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity, Stethoscope, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface AuthProps {
  login: (role: 'patient' | 'clinician') => void;
}

const Auth = ({ login }: AuthProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'patient' | 'clinician'>('patient');

  const handleLogin = (role: 'patient' | 'clinician') => {
    setLoading(true);
    setTimeout(() => {
      login(role);
      toast.success(`Welcome back, ${role}!`, {
        className: 'brutal-card bg-primary text-foreground font-black uppercase border-[3px] border-border shadow-brutal',
      });
      navigate(role === 'patient' ? '/dashboard' : '/clinician');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-12">
          <div className="inline-flex h-24 w-24 items-center justify-center border-[4px] border-border bg-primary text-foreground shadow-brutal mb-8 rotate-3">
            <Activity className="h-12 w-12 stroke-[4px]" />
          </div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-foreground mb-2">ACCESS THE LAB</h1>
          <p className="text-sm font-black uppercase tracking-[0.2em] opacity-60">Identity Verification Protocol 01-A</p>
        </div>

        <div className="brutal-card p-10 bg-card overflow-hidden">
          <div className="grid grid-cols-2 border-[4px] border-border mb-10 shadow-brutal-sm">
            <button
              onClick={() => setActiveTab('patient')}
              className={`py-5 font-black uppercase tracking-widest transition-all ${
                activeTab === 'patient' ? 'bg-primary text-foreground shadow-inner' : 'bg-background text-foreground hover:bg-primary/20'
              }`}
            >
              Subject
            </button>
            <button
              onClick={() => setActiveTab('clinician')}
              className={`py-5 font-black uppercase tracking-widest transition-all ${
                activeTab === 'clinician' ? 'bg-primary text-foreground shadow-inner' : 'bg-background text-foreground hover:bg-primary/20'
              }`}
            >
              Operator
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b-[3px] border-border pb-4">
              {activeTab === 'patient' ? <User className="h-7 w-7 text-primary stroke-[3px]" /> : <Stethoscope className="h-7 w-7 text-primary stroke-[3px]" />}
              <h2 className="text-3xl font-black uppercase italic tracking-tight">
                {activeTab === 'patient' ? 'Subject Entry' : 'Operator Access'}
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-primary" htmlFor="email">Email Identifier</label>
                <input 
                  id="email" 
                  type="email" 
                  className="brutal-input w-full font-black uppercase placeholder:italic h-14"
                  placeholder="ID: PROTO-001@REHABAI.IO"
                  defaultValue={activeTab === 'patient' ? "patient@demo.com" : "clinician@demo.com"}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-primary" htmlFor="password">Security Protocol</label>
                <input 
                  id="password" 
                  type="password" 
                  className="brutal-input w-full font-black h-14"
                  placeholder="**********"
                  defaultValue="password123"
                />
              </div>
            </div>

            <button 
              className={`brutal-btn w-full mt-10 h-16 text-xl flex items-center justify-center gap-3 ${loading ? 'opacity-50' : ''}`}
              disabled={loading}
              onClick={() => handleLogin(activeTab)}
            >
              {loading ? "PROCESSING..." : `INITIALIZE SESSION`}
              <ArrowRight className="h-6 w-6 stroke-[4px]" />
            </button>

            <div className="pt-8 border-t-[3px] border-border/20 flex flex-col gap-4">
               <button className="text-xs font-black uppercase tracking-widest text-center hover:text-primary underline decoration-[3px] decoration-primary underline-offset-4">
                  Request Credential Reset?
               </button>
               <button className="text-sm font-black uppercase tracking-widest text-center italic">
                  New Subject? <span className="text-accent underline decoration-primary decoration-[6px] underline-offset-4">Register Database</span>
               </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;