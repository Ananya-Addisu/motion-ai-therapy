import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Play, 
  Trophy,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const data = [
  { name: 'Mon', accuracy: 82, reps: 45 },
  { name: 'Tue', accuracy: 85, reps: 52 },
  { name: 'Wed', accuracy: 84, reps: 48 },
  { name: 'Thu', accuracy: 88, reps: 60 },
  { name: 'Fri', accuracy: 92, reps: 55 },
  { name: 'Sat', accuracy: 95, reps: 65 },
  { name: 'Sun', accuracy: 93, reps: 40 },
];

const Dashboard = () => {
  const todayExercises = [
    { id: '1', name: 'Wall Squats', sets: '3 sets of 15', duration: '10 min', status: 'Completed', score: 94 },
    { id: '2', name: 'Shoulder External Rotation', sets: '2 sets of 12', duration: '8 min', status: 'Pending', score: 0 },
    { id: '3', name: 'Hip Bridges', sets: '3 sets of 20', duration: '12 min', status: 'Pending', score: 0 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-foreground mb-2">Subject Hub</h1>
          <p className="text-xl font-bold border-l-[6px] border-primary pl-4 uppercase">Protocol Day <span className="text-primary underline decoration-[4px]">14</span> / 60</p>
        </div>
        <div className="flex gap-6">
          <div className="brutal-card bg-primary px-6 py-4 flex gap-4 items-center">
            <Flame className="h-8 w-8 text-foreground stroke-[3px]" />
            <div>
              <span className="block text-2xl font-black">5 DAYS</span>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">STREAK LOG</span>
            </div>
          </div>
          <div className="brutal-card bg-secondary px-6 py-4 flex gap-4 items-center">
            <Trophy className="h-8 w-8 text-foreground stroke-[3px]" />
            <div>
              <span className="block text-2xl font-black">LVL 04</span>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">BIO-RANK</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Progress & Stats */}
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "AVG. ACCURACY", value: "92.4%", icon: TrendingUp, color: "bg-primary" },
              { label: "TOTAL REPS", value: "1,248", icon: CheckCircle2, color: "bg-secondary" },
              { label: "BIO-HOURS", value: "7.0", icon: Clock, color: "bg-accent text-black" }
            ].map((stat, i) => (
              <div key={i} className={`brutal-card p-6 flex flex-col justify-between ${stat.color}`}>
                <div className={`border-[3px] border-border p-2 w-fit mb-4 bg-background`}>
                  <stat.icon className="h-6 w-6 text-foreground stroke-[3px]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">{stat.label}</p>
                  <p className="text-3xl font-black italic">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="brutal-card p-8 bg-card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black uppercase italic tracking-tight">Biometric Stream</h3>
              <div className="bg-primary text-foreground px-3 py-1 text-[10px] font-black uppercase tracking-widest border-[2px] border-border shadow-brutal-sm">LIVE FEED</div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="0" stroke="#333" />
                  <XAxis dataKey="name" axisLine={{stroke: '#f0f0f0', strokeWidth: 3}} tick={{fill: '#f0f0f0', fontWeight: 'bold'}} />
                  <YAxis axisLine={{stroke: '#f0f0f0', strokeWidth: 3}} tick={{fill: '#f0f0f0', fontWeight: 'bold'}} domain={[60, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#262626', border: '3px solid #f0f0f0', borderRadius: '0', boxShadow: '4px 4px 0px 0px rgba(240,240,240,1)', fontWeight: 'bold', color: '#f0f0f0' }}
                    itemStyle={{ color: '#f0f0f0' }}
                  />
                  <Line 
                    type="step" 
                    dataKey="accuracy" 
                    stroke="#8b0000" 
                    strokeWidth={5} 
                    dot={{ r: 8, fill: '#facc15', strokeWidth: 3, stroke: '#f0f0f0' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="brutal-card p-8 bg-card border-dashed">
            <h3 className="text-3xl font-black uppercase italic mb-8 tracking-tight">Rep Consistency</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="0" stroke="#333" />
                  <XAxis dataKey="name" axisLine={{stroke: '#f0f0f0', strokeWidth: 3}} tick={{fill: '#f0f0f0', fontWeight: 'bold'}} />
                  <Tooltip 
                    cursor={{fill: '#333'}}
                    contentStyle={{ backgroundColor: '#262626', border: '3px solid #f0f0f0', borderRadius: '0', boxShadow: '4px 4px 0px 0px rgba(240,240,240,1)' }}
                  />
                  <Bar dataKey="reps" fill="#00008b" stroke="#f0f0f0" strokeWidth={3} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Tasks */}
        <div className="space-y-8">
          <div className="brutal-card overflow-hidden">
            <div className="bg-primary text-foreground p-6 border-b-[3px] border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase italic">Daily Log</h3>
                <span className="bg-accent text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest italic shadow-brutal-sm">1 / 3 LOADED</span>
              </div>
            </div>
            <div className="divide-y-[3px] divide-border bg-card">
              {todayExercises.map((ex) => (
                <div key={ex.id} className="p-6 flex items-center justify-between hover:bg-primary/10 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className={`h-14 w-14 border-[3px] border-border flex items-center justify-center shadow-brutal-sm transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none ${
                      ex.status === 'Completed' ? 'bg-accent' : 'bg-background'
                    }`}>
                      {ex.status === 'Completed' ? (
                        <CheckCircle2 className="h-8 w-8 text-black stroke-[3px]" />
                      ) : (
                        <Play className="h-6 w-6 text-foreground fill-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase italic tracking-tight">{ex.name}</h4>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">
                        <span className="flex items-center gap-1 text-primary"><Calendar className="h-3 w-3" /> {ex.sets}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ex.duration}</span>
                      </div>
                    </div>
                  </div>
                  {ex.status === 'Completed' ? (
                    <div className="text-right">
                      <span className="block text-2xl font-black text-primary italic underline underline-offset-4">{ex.score}%</span>
                    </div>
                  ) : (
                    <Link to={`/session/${ex.id}`} className="brutal-btn-accent py-2 px-4 text-xs">
                      BOOT
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="brutal-card bg-secondary text-foreground p-8">
            <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter underline decoration-primary decoration-[6px]">WEEKLY QUOTA</h3>
            <p className="font-bold mb-6 opacity-80 uppercase tracking-widest text-xs italic">Complete 4 protocols to unlock discharge review</p>
            <div className="space-y-4">
              <div className="flex justify-between font-black uppercase text-xs italic">
                <span>3/7 COMPLETED</span>
                <span>42%</span>
              </div>
              <div className="h-6 w-full bg-background border-[3px] border-border overflow-hidden relative shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '42%' }}
                  className="h-full bg-primary border-r-[3px] border-border shadow-[4px_0_0_0_#f0f0f0]" 
                />
              </div>
            </div>
          </div>

          <div className="brutal-card p-8 bg-card border-border border-[4px]">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="h-6 w-6 stroke-[3px] text-primary" />
              <h3 className="font-black uppercase tracking-widest text-lg italic">Clinical Notes</h3>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-14 w-14 border-[3px] border-border bg-background flex-shrink-0 overflow-hidden shadow-brutal-sm">
                <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3afd1799-0d10-47bf-b33a-ce82af40cbc4/clinician-profile-0a26fec9-1775670510612.webp" alt="PT" className="grayscale contrast-125" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground border-[3px] border-border bg-background p-4 shadow-brutal-sm italic text-sm">
                  "Joint alignment protocol looks optimal. Maintain current velocity."
                </p>
                <span className="text-[10px] font-black uppercase tracking-widest mt-4 block opacity-50">DR. MILLER / SYSTEM SCAN / 2H AGO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;