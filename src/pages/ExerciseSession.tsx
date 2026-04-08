import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Camera, 
  Mic, 
  Settings, 
  X, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw,
  Volume2,
  Activity,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

const ExerciseSession = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [formScore, setFormScore] = useState(100);
  const [feedback, setFeedback] = useState("CALIBRATING... POSITION SKELETON IN CENTER FRAME.");
  const [feedbackType, setFeedbackType] = useState<'info' | 'success' | 'warning'>('info');
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  const [finished, setFinished] = useState(false);

  const totalReps = 12;

  const startSession = () => {
    setShowCountdown(true);
  };

  useEffect(() => {
    let timer: any;
    if (showCountdown && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showCountdown && countdown === 0) {
      setShowCountdown(false);
      setIsActive(true);
      setFeedback("LIVE: MAINTAIN CORE RIGIDITY.");
    }
    return () => clearTimeout(timer);
  }, [showCountdown, countdown]);

  useEffect(() => {
    let interval: any;
    if (isActive && repCount < totalReps) {
      interval = setInterval(() => {
        setRepCount(prev => prev + 1);
        
        const rand = Math.random();
        if (rand > 0.8) {
          setFeedback("WARNING: VELOCITY TOO HIGH ON DESCENSION.");
          setFeedbackType('warning');
          setFormScore(prev => Math.max(70, prev - 2));
        } else if (rand > 0.4) {
          setFeedback("OPTIMAL: EXCELLENT BIOMECHANICS.");
          setFeedbackType('success');
          setFormScore(prev => Math.min(100, prev + 1));
        } else {
          setFeedback("ADJUST: CENTER BODY IN SENSOR RANGE.");
          setFeedbackType('info');
        }
      }, 3000);
    } else if (repCount >= totalReps) {
      setIsActive(false);
      setFinished(true);
      toast.success("DATA LOGGED TO BIO-VAULT", {
        className: 'brutal-card bg-primary text-foreground font-black border-[3px] border-border shadow-brutal'
      });
    }
    return () => clearInterval(interval);
  }, [isActive, repCount]);

  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col overflow-hidden text-foreground font-sans">
      {/* Top HUD */}
      <div className="flex items-center justify-between px-8 py-6 border-b-[4px] border-border bg-card shadow-[0_6px_0_0_#f0f0f0] z-10">
        <div className="flex items-center gap-8">
          <button 
            className="p-3 border-[3px] border-border bg-background shadow-brutal-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-7 w-7 stroke-[4px]" />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">PROTOCOL: {exerciseId?.toUpperCase()}</h1>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary italic">BIO-SENSING ACTIVE / SYSTEM V.2.0</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            <button className="p-3 border-[3px] border-border bg-background shadow-brutal-sm"><Volume2 className="h-6 w-6 stroke-[3px]" /></button>
            <button className="p-3 border-[3px] border-border bg-background shadow-brutal-sm"><Mic className="h-6 w-6 stroke-[3px]" /></button>
            <button className="p-3 border-[3px] border-border bg-background shadow-brutal-sm"><Settings className="h-6 w-6 stroke-[3px]" /></button>
          </div>
          <button 
            className="p-3 border-[3px] border-border bg-primary text-foreground shadow-brutal-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all ml-4"
            onClick={() => navigate('/dashboard')}
          >
            <X className="h-7 w-7 stroke-[4px]" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative p-8 gap-8">
        {/* Main AI View */}
        <div className="flex-1 relative brutal-card bg-card p-2 overflow-hidden flex items-center justify-center border-[4px] border-border">
          {!isActive && !showCountdown && !finished ? (
            <div className="text-center p-16 max-w-xl brutal-card bg-primary z-20 border-[4px] border-border shadow-brutal-lg">
              <div className="h-28 w-28 border-[4px] border-border bg-background flex items-center justify-center mx-auto mb-10 shadow-brutal animate-bounce">
                <Camera className="h-14 w-14 text-primary stroke-[4px]" />
              </div>
              <h2 className="text-5xl font-black uppercase italic mb-6 tracking-tighter text-foreground">INITIALIZE SENSORS</h2>
              <p className="font-bold text-xl mb-12 uppercase tracking-tight border-b-[4px] border-border pb-6 italic opacity-90">Skeletal calibration required for real-time biomechanical analysis.</p>
              <button className="brutal-btn-accent text-3xl w-full py-8 italic shadow-brutal-lg" onClick={startSession}>
                START SCAN
              </button>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden border-[4px] border-border">
                <img 
                  src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale contrast-150 brightness-50"
                  alt="Camera Simulation"
                />
                
                {/* AI HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none p-12">
                   <div className="h-full w-full border-[2px] border-primary/40 border-dashed relative">
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-[8px] border-l-[8px] border-primary" />
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-[8px] border-r-[8px] border-primary" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[8px] border-l-[8px] border-primary" />
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[8px] border-r-[8px] border-primary" />
                      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-primary/20" />
                   </div>
                </div>

                {/* Simulated Skeleton */}
                {isActive && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                      <motion.circle cx="50" cy="30" r="2" fill="#facc15" stroke="#f0f0f0" strokeWidth="0.5" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
                      <line x1="50" y1="30" x2="50" y2="60" stroke="#facc15" strokeWidth="1.2" />
                      <line x1="50" y1="60" x2="40" y2="85" stroke="#facc15" strokeWidth="1.2" />
                      <line x1="50" y1="60" x2="60" y2="85" stroke="#facc15" strokeWidth="1.2" />
                      <line x1="50" y1="45" x2="30" y2="55" stroke="#facc15" strokeWidth="1.2" />
                      <line x1="50" y1="45" x2="70" y2="55" stroke="#facc15" strokeWidth="1.2" />
                      {/* Joint markers */}
                      {[30, 45, 60, 85].map((y, i) => (
                        <circle key={i} cx={i % 2 === 0 ? 40 : 60} cy={y} r="1" fill="#8b0000" stroke="#f0f0f0" strokeWidth="0.3" />
                      ))}
                  </svg>
                )}
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-12 left-12 flex flex-col gap-6">
                 <div className="bg-background text-foreground border-[4px] border-border px-10 py-6 shadow-brutal flex flex-col items-center min-w-[180px]">
                    <span className="text-7xl font-black italic leading-none mb-2">{repCount}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">REPS_COUNT</span>
                 </div>
                 <div className="bg-primary text-foreground border-[4px] border-border px-10 py-6 shadow-brutal flex flex-col items-center min-w-[180px]">
                    <span className="text-5xl font-black italic leading-none mb-2">{formScore}%</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-background">FORM_SCORE</span>
                 </div>
              </div>

              {/* AI Feedback */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={feedback}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  className="absolute top-12 right-12 max-w-sm"
                >
                  <div className={`p-8 border-[5px] border-border shadow-brutal-lg ${
                    feedbackType === 'success' ? 'bg-secondary' :
                    feedbackType === 'warning' ? 'bg-primary' :
                    'bg-card'
                  }`}>
                    <div className="flex items-center gap-4 mb-3">
                       {feedbackType === 'warning' ? <AlertCircle className="h-7 w-7 stroke-[4px]" /> : <Activity className="h-7 w-7 stroke-[4px]" />}
                       <span className="font-black uppercase tracking-[0.2em] text-[10px]">BIO_FEEDBACK</span>
                    </div>
                    <p className="font-black uppercase italic text-2xl leading-none tracking-tighter">{feedback}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Countdown Overlay */}
              {showCountdown && (
                <div className="absolute inset-0 bg-background/90 flex items-center justify-center z-50">
                  <motion.div 
                    key={countdown}
                    initial={{ scale: 3, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    className="text-[250px] font-black italic text-primary drop-shadow-[10px_10px_0px_#f0f0f0]"
                  >
                    {countdown}
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* HUD Sidebar */}
        <div className="w-full md:w-[400px] flex flex-col gap-8">
          <div className="brutal-card p-10 bg-card flex-1 flex flex-col border-[4px] border-border">
            <h3 className="text-3xl font-black uppercase italic mb-12 underline decoration-primary decoration-[8px] underline-offset-4">SYS_METRICS</h3>
            
            <div className="space-y-12 flex-1">
              <section>
                <div className="flex justify-between font-black uppercase text-xs mb-4 tracking-widest">
                  <span>SESSION_VOLUME</span>
                  <span>{repCount} / {totalReps}</span>
                </div>
                <div className="h-10 w-full border-[4px] border-border bg-background overflow-hidden relative shadow-inner">
                  <motion.div 
                    className="h-full bg-primary border-r-[4px] border-border"
                    initial={{ width: 0 }}
                    animate={{ width: `${(repCount / totalReps) * 100}%` }}
                  />
                </div>
              </section>

              <section>
                <h4 className="font-black uppercase tracking-[0.2em] text-[10px] opacity-60 mb-8 italic">BIOMETRIC_STATUS</h4>
                <div className="space-y-8">
                  {[
                    { label: "KNEE_ALIGNMENT", value: 92, color: "bg-secondary" },
                    { label: "PELVIC_TILT", value: 85, color: "bg-accent text-black" },
                    { label: "TORSO_VECTOR", value: formScore, color: "bg-primary" },
                  ].map(metric => (
                    <div key={metric.label}>
                      <div className="flex justify-between font-black uppercase text-[10px] mb-3 tracking-widest">
                        <span>{metric.label}</span>
                        <span>{metric.value}%</span>
                      </div>
                      <div className="h-6 w-full border-[3px] border-border bg-background">
                        <motion.div 
                          className={`h-full ${metric.color.split(' ')[0]} border-r-[3px] border-border`}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {!finished && (
              <button 
                className="brutal-btn-accent w-full flex items-center justify-center gap-3 py-6 mt-12 text-xl italic"
                onClick={() => {
                  setRepCount(0);
                  setIsActive(false);
                  setFinished(false);
                  setFormScore(100);
                }}
              >
                <RotateCcw className="h-6 w-6 stroke-[4px]" /> RESET_SCAN
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {finished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[110] bg-background/80 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 100, rotate: -3 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              className="bg-card border-[8px] border-border shadow-[24px_24px_0_0_#8b0000] p-16 max-w-2xl w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-5 bg-primary border-b-[6px] border-l-[6px] border-border text-foreground font-black uppercase text-sm tracking-widest italic">
                LOG: #PROTOCOL_992
              </div>
              <div className="w-28 h-28 border-[6px] border-border bg-secondary flex items-center justify-center mx-auto mb-10 shadow-brutal rotate-6">
                <CheckCircle2 className="h-16 w-16 text-foreground stroke-[5px]" />
              </div>
              <h2 className="text-7xl font-black uppercase italic mb-6 leading-none tracking-tighter">MISSION<br/>ACCOMPLISHED</h2>
              <p className="text-2xl font-black uppercase tracking-tight mb-12 border-y-[4px] border-border py-6 italic">Precision Rating: <span className="text-primary underline decoration-[8px] decoration-primary underline-offset-8">{formScore}%</span></p>
              
              <div className="grid grid-cols-2 gap-8 mb-16">
                <div className="brutal-card p-8 bg-accent text-black rotate-2 border-[4px] border-border">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2">BIO_VOLUME</span>
                  <span className="text-5xl font-black italic">{repCount} REPS</span>
                </div>
                <div className="brutal-card p-8 bg-primary text-foreground -rotate-2 border-[4px] border-border">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2">XP_GAINED</span>
                  <span className="text-5xl font-black italic">+250 PTS</span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <button 
                  className="brutal-btn text-3xl py-8 flex items-center justify-center gap-4 italic shadow-brutal-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  DASHBOARD_EXIT <ChevronRight className="h-10 w-10 stroke-[5px]" />
                </button>
                <button className="text-sm font-black uppercase tracking-[0.3em] hover:text-primary transition-all underline decoration-[4px] decoration-border underline-offset-8">
                  DOWNLOAD_BIO_RECORDING
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExerciseSession;