import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Bell, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  MoreVertical,
  Calendar,
  Filter,
  ArrowUpRight
} from "lucide-react";

const PATIENTS = [
  { id: '1', name: 'Alex Johnson', diagnosis: 'ACL Reconstruction', adherence: 94, status: 'On Track', lastSeen: 'Today' },
  { id: '2', name: 'Sarah Williams', diagnosis: 'Shoulder Impingement', adherence: 45, status: 'At Risk', lastSeen: '2 days ago' },
  { id: '3', name: 'Michael Chen', diagnosis: 'Herniated Disc', adherence: 88, status: 'On Track', lastSeen: 'Yesterday' },
  { id: '4', name: 'Emma Davis', diagnosis: 'Ankle Sprain (Grade 2)', adherence: 72, status: 'Needs Review', lastSeen: '3 days ago' },
  { id: '5', name: 'Robert Wilson', diagnosis: 'Hip Bursitis', adherence: 91, status: 'On Track', lastSeen: 'Today' },
];

const ClinicianDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <h1 className="text-7xl font-black uppercase italic tracking-tighter text-foreground underline decoration-primary decoration-[12px] underline-offset-8">COMMAND</h1>
          <p className="text-2xl font-bold border-l-[8px] border-primary pl-6 mt-6 uppercase tracking-tight italic">MONITORING <span className="text-secondary">24 ACTIVE SUBJECTS</span></p>
        </div>
        <div className="flex gap-6">
          <button className="p-5 border-[4px] border-border bg-card text-foreground shadow-brutal-sm relative active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
            <Bell className="h-8 w-8 stroke-[4px]" />
            <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center border-[3px] border-border bg-primary text-xs font-black text-foreground shadow-brutal-sm">3</span>
          </button>
          <button className="brutal-btn text-xl italic px-8">ENROLL_SUBJECT</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-16">
        {[
          { label: "AVG_ADHERENCE", value: "82%", icon: TrendingUp, color: "bg-card text-foreground", sub: "STAT_UP: +4.2%" },
          { label: "RISK_VECTORS", value: "03", icon: AlertCircle, color: "bg-primary text-foreground", sub: "ACTION_REQUIRED" },
          { label: "BIO_SESSIONS", value: "1.4K", icon: Users, color: "bg-secondary text-foreground", sub: "NETWORK_LOAD" },
          { label: "SUCCESS_RATE", value: "91%", icon: CheckCircle2, color: "bg-accent text-black", sub: "DISCHARGE_READY" }
        ].map((stat, i) => (
          <div key={i} className={`brutal-card p-8 flex flex-col justify-between ${stat.color} border-[4px] border-border`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">{stat.label}</p>
                <h3 className="text-5xl font-black italic mt-3 tracking-tighter">{stat.value}</h3>
              </div>
              <div className="p-3 border-[3px] border-current bg-background">
                <stat.icon className="h-8 w-8 stroke-[4px]" />
              </div>
            </div>
            <p className="mt-10 text-[10px] font-black uppercase tracking-widest border-t-[3px] border-current pt-4 italic">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 brutal-card bg-card p-10 border-[4px] border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 border-b-[4px] border-border pb-10">
            <div>
              <h3 className="text-4xl font-black uppercase italic tracking-tighter text-foreground">Subject_Registry</h3>
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-50 mt-1 italic">REAL-TIME BIOMETRIC STREAM</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-primary stroke-[4px]" />
                <input 
                  placeholder="SEARCH_ID..." 
                  className="brutal-input pl-14 h-16 w-full md:w-[280px] text-lg font-black uppercase tracking-widest bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-4 border-[4px] border-border bg-background shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <Filter className="h-6 w-6 stroke-[4px]" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-[4px] border-border">
                  <th className="py-6 font-black uppercase tracking-[0.2em] text-[10px] text-primary">SUBJECT_ID</th>
                  <th className="py-6 font-black uppercase tracking-[0.2em] text-[10px] text-primary">PROTOCOL</th>
                  <th className="py-6 font-black uppercase tracking-[0.2em] text-[10px] text-primary text-center">LOAD_LVL</th>
                  <th className="py-6 font-black uppercase tracking-[0.2em] text-[10px] text-primary">STATUS</th>
                  <th className="py-6 font-black uppercase tracking-[0.2em] text-[10px] text-primary text-right">EXEC</th>
                </tr>
              </thead>
              <tbody className="divide-y-[3px] divide-border/20">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="group cursor-pointer hover:bg-primary/10 transition-colors">
                    <td className="py-8">
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 border-[3px] border-border bg-secondary shadow-brutal-sm flex items-center justify-center font-black text-xl italic text-foreground">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-black uppercase italic text-xl leading-none tracking-tighter text-foreground">{patient.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-2">SYNC_ID: {patient.lastSeen?.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-8 font-black uppercase text-xs italic opacity-80">{patient.diagnosis}</td>
                    <td className="py-8">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-5 w-32 border-[3px] border-border bg-background overflow-hidden shadow-inner">
                          <div 
                            className={`h-full border-r-[3px] border-border ${
                              patient.adherence > 80 ? 'bg-accent' :
                              patient.adherence > 60 ? 'bg-secondary' : 'bg-primary'
                            }`}
                            style={{ width: `${patient.adherence}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black tracking-widest">{patient.adherence}%</span>
                      </div>
                    </td>
                    <td className="py-8">
                      <div className={`inline-block border-[3px] border-border px-4 py-2 text-[10px] font-black uppercase italic shadow-brutal-sm ${
                        patient.status === 'On Track' ? 'bg-secondary' :
                        patient.status === 'Needs Review' ? 'bg-accent text-black' :
                        'bg-primary'
                      }`}>
                        {patient.status}
                      </div>
                    </td>
                    <td className="py-8 text-right">
                      <button className="p-3 border-[3px] border-border bg-background hover:bg-primary transition-all shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1">
                        <MoreVertical className="h-5 w-5 stroke-[4px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-12">
          <div className="brutal-card p-10 bg-card overflow-hidden relative border-[4px] border-border">
            <div className="absolute top-0 right-0 p-4 bg-secondary border-b-[4px] border-l-[4px] border-border font-black text-[10px] uppercase italic shadow-brutal-sm">
              BIO_BROADCAST
            </div>
            <h3 className="text-3xl font-black uppercase italic mb-10 underline decoration-primary decoration-[8px] underline-offset-8">Network_Load</h3>
            <div className="h-[220px] w-full border-[4px] border-border bg-background relative flex items-end p-6 gap-3">
               <div className="flex gap-3 w-full h-full items-end">
                  {[40, 60, 45, 80, 75, 90, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary border-[3px] border-border shadow-brutal-sm transition-all hover:scale-110 hover:bg-secondary" style={{ height: `${h}%` }} />
                  ))}
               </div>
            </div>
            <div className="mt-10 flex justify-between items-center bg-background border-[4px] border-border p-6 shadow-brutal-sm">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">SYSTEM_ACCURACY</span>
              <span className="text-4xl font-black italic text-foreground tracking-tighter">94.8%</span>
            </div>
          </div>

          <div className="brutal-card p-10 bg-card border-[4px] border-border">
            <h3 className="text-3xl font-black uppercase italic mb-12 underline decoration-accent decoration-[8px] underline-offset-8">UPCOMING_SYNC</h3>
            <div className="space-y-8">
              {[
                { name: 'Michael Chen', time: '10:00', type: 'VIDEO_CALIBRATION' },
                { name: 'Sarah Williams', time: '11:30', type: 'BIO_STREAM_REVIEW' },
                { name: 'Alex Johnson', time: '14:00', type: 'DISCHARGE_LOG' },
              ].map((apt, i) => (
                <div key={i} className="flex items-center justify-between p-6 border-[4px] border-border shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer bg-background group">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 border-[3px] border-border bg-primary flex items-center justify-center text-foreground group-hover:bg-secondary transition-colors shadow-brutal-sm">
                      <Calendar className="h-7 w-7 stroke-[4px]" />
                    </div>
                    <div>
                      <p className="font-black uppercase italic text-xl leading-none tracking-tighter text-foreground">{apt.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-2">{apt.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black italic text-foreground">{apt.time}</p>
                    <ArrowUpRight className="h-6 w-6 stroke-[4px] ml-auto text-primary" />
                  </div>
                </div>
              ))}
              <button className="w-full py-6 mt-4 border-[4px] border-border bg-primary font-black uppercase tracking-widest text-lg italic hover:bg-background transition-all shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none">
                MASTER_SCHEDULE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicianDashboard;