import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Video, 
  BarChart3, 
  Users, 
  ShieldCheck,
  Activity
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b-[4px] border-border bg-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block border-[3px] border-border bg-secondary px-4 py-1 text-sm font-black uppercase tracking-widest text-foreground shadow-brutal-sm mb-6">
                Physical Therapy 2.0
              </div>
              <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-7xl leading-[1.1]">
                RECOVER <span className="text-primary italic underline decoration-[10px] underline-offset-4">FASTER</span> WITH AI
              </h1>
              <p className="mt-8 text-xl font-bold leading-relaxed text-foreground border-l-[6px] border-primary pl-6 max-w-lg italic opacity-90">
                Stop guessing your form. Our AI tracks every rep in real-time. Clinician-backed, patient-approved.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Link to="/auth" className="brutal-btn text-xl px-10 py-5 flex items-center">
                  START NOW <ArrowRight className="ml-2 h-6 w-6 stroke-[3px]" />
                </Link>
                <Link to="/library" className="text-lg font-black uppercase tracking-widest underline decoration-[4px] decoration-primary hover:text-primary transition-colors">
                  View Exercises
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotate: -2 }}
              animate={{ opacity: 1, rotate: 2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 lg:mt-0 relative"
            >
              <div className="relative brutal-card p-2 bg-[#262626] border-border">
                <img
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3afd1799-0d10-47bf-b33a-ce82af40cbc4/hero-image---rehabai-in-action-6221f364-1775670510794.webp"
                  alt="RehabAI App Demo"
                  className="w-full h-auto grayscale transition-all duration-500 hover:grayscale-0 border-[3px] border-border"
                />
                <div className="absolute -top-4 -left-4 bg-accent border-[3px] border-border px-4 py-2 shadow-brutal-sm flex items-center gap-2">
                  <div className="h-3 w-3 bg-red-600 border border-black animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-black">Live AI tracking: ON</span>
                </div>
              </div>
              {/* Decorative block */}
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-secondary border-[3px] border-border -z-10 shadow-brutal" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-24 border-b-[4px] border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-6xl italic underline decoration-primary decoration-[8px]">
              The Core Tech
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "AI Pose Analysis",
                description: "Skeletal tracking ensures every rep is perfect.",
                icon: Video,
                color: "bg-primary"
              },
              {
                title: "Progress Track",
                description: "Visual charts for your recovery journey.",
                icon: BarChart3,
                color: "bg-secondary"
              },
              {
                title: "Clinician Portal",
                description: "Remote monitoring by your therapist.",
                icon: Users,
                color: "bg-accent"
              },
              {
                title: "Secure Data",
                description: "HIPAA-compliant platform.",
                icon: ShieldCheck,
                color: "bg-primary"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, x: -4 }}
                className="brutal-card p-8 group flex flex-col items-start bg-card border-border"
              >
                <div className={`${feature.color} w-14 h-14 border-[3px] border-border shadow-brutal-sm flex items-center justify-center text-foreground mb-8 group-hover:shadow-none transition-all`}>
                  <feature.icon className="h-8 w-8 stroke-[3px]" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight text-foreground">{feature.title}</h3>
                <p className="text-foreground/80 font-bold leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-24">
            <div className="lg:flex-1">
              <h2 className="text-5xl font-black uppercase mb-12 italic text-foreground underline decoration-secondary decoration-[6px]">The Process</h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "ASSESSMENT", text: "Calibrate the AI for your unique body.", color: "text-primary" },
                  { step: "02", title: "PRACTICE", text: "Follow guided videos with live voice feedback.", color: "text-secondary" },
                  { step: "03", title: "REVIEW", text: "Your PT receives performance summary.", color: "text-accent" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className={`text-6xl font-black italic opacity-20 ${item.color} group-hover:opacity-100 transition-opacity`}>{item.step}</span>
                    <div className="border-l-[4px] border-border pl-8">
                      <h4 className={`text-2xl font-black uppercase mb-2 tracking-widest ${item.color}`}>{item.title}</h4>
                      <p className="text-foreground font-bold text-lg">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:flex-1 mt-16 lg:mt-0">
              <div className="brutal-card p-4 bg-card border-border relative">
                 <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3afd1799-0d10-47bf-b33a-ce82af40cbc4/data-visualization-dashboard-7a7b77a9-1775670510235.webp" 
                  alt="Dashboard" 
                  className="border-[3px] border-border grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute -bottom-6 left-12 right-12 bg-primary text-foreground border-[3px] border-border p-4 shadow-brutal flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-foreground stroke-[3px]" />
                    <span className="font-black uppercase tracking-widest text-sm italic">98% Accuracy</span>
                  </div>
                  <div className="h-6 w-6 bg-accent border-[2px] border-border animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-foreground py-16 border-t-[4px] border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center border-b-[3px] border-border/50 pb-12 mb-12">
            <div className="flex items-center gap-3 mb-8 md:mb-0">
              <div className="p-2 border-[3px] border-border bg-primary shadow-brutal-sm">
                <Activity className="h-8 w-8 text-foreground stroke-[3px]" />
              </div>
              <span className="text-4xl font-black uppercase italic tracking-tighter">Rehab<span className="text-primary">AI</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              {['Privacy', 'Terms', 'Support', 'Clinic Login'].map(link => (
                <a key={link} href="#" className="font-black uppercase tracking-widest text-sm hover:text-primary transition-colors hover:underline underline-offset-8 decoration-[3px] decoration-primary">{link}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold uppercase tracking-widest opacity-60">© 2024 RehabAI. BUILD STICKY BONES.</p>
            <div className="flex gap-4">
               {['X', 'IG', 'IN'].map(social => (
                 <div key={social} className="w-10 h-10 border-[3px] border-border flex items-center justify-center font-black hover:bg-primary hover:shadow-brutal-sm transition-all cursor-pointer">
                   {social}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;