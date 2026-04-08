import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, Clock, Activity, Bookmark, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const EXERCISES = [
  {
    id: '1',
    name: 'Wall Squats',
    category: 'Lower Body',
    difficulty: 'Easy',
    duration: '10 min',
    focus: 'Quad Strength',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    description: 'A strength building exercise for the quadriceps, hamstrings and glutes.'
  },
  {
    id: '2',
    name: 'Shoulder External Rotation',
    category: 'Upper Body',
    difficulty: 'Medium',
    duration: '8 min',
    focus: 'Rotator Cuff',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    description: 'Strengthens the rotator cuff muscles for better shoulder stability.'
  },
  {
    id: '3',
    name: 'Hip Bridges',
    category: 'Lower Body',
    difficulty: 'Easy',
    duration: '12 min',
    focus: 'Glutes & Core',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
    description: 'Excellent for glute activation and lumbar spine stability.'
  },
  {
    id: '4',
    name: 'Plank with Alternating Arm Lift',
    category: 'Core',
    difficulty: 'Hard',
    duration: '5 min',
    focus: 'Core Stability',
    image: 'https://images.unsplash.com/photo-1566241477600-ac026ad43874?auto=format&fit=crop&w=800&q=80',
    description: 'Advanced core exercise that also tests shoulder stability.'
  },
  {
    id: '5',
    name: 'Single Leg Balance',
    category: 'Balance',
    difficulty: 'Medium',
    duration: '6 min',
    focus: 'Proprioception',
    image: 'https://images.unsplash.com/photo-1518611012118-296072bb5fe7?auto=format&fit=crop&w=800&q=80',
    description: 'Improves balance and strengthens the stabilizing muscles of the ankle.'
  },
  {
    id: '6',
    name: 'Deadbug',
    category: 'Core',
    difficulty: 'Easy',
    duration: '8 min',
    focus: 'Spine Stability',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c64b5cc5?auto=format&fit=crop&w=800&q=80',
    description: 'A fundamental core stability exercise that protects the lower back.'
  }
];

const CATEGORIES = ['All', 'Lower Body', 'Upper Body', 'Core', 'Balance', 'Mobility'];

const ExerciseLibrary = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || ex.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="mb-16">
        <h1 className="text-7xl font-black uppercase italic tracking-tighter text-foreground mb-6 underline decoration-primary decoration-[12px] underline-offset-4">Protocol Vault</h1>
        <p className="text-2xl font-bold border-l-[8px] border-primary pl-6 max-w-3xl italic">Select your bio-mechanical protocol. All modules integrate live skeletal tracking.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 mb-16 items-start justify-between">
        <div className="relative w-full lg:max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 text-primary stroke-[4px]" />
          <input 
            className="brutal-input pl-16 w-full h-20 text-2xl font-black uppercase tracking-widest placeholder:opacity-30 placeholder:italic" 
            placeholder="SEARCH PROTOCOL..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 font-black uppercase tracking-widest border-[4px] border-border transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-foreground shadow-inner translate-x-1 translate-y-1' 
                  : 'bg-card text-foreground shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredExercises.map((ex, idx) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group brutal-card overflow-hidden flex flex-col bg-card"
          >
            <div className="relative h-72 overflow-hidden border-b-[4px] border-border">
              <img 
                src={ex.image} 
                alt={ex.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100"
              />
              <div className="absolute top-6 left-6">
                <div className="bg-primary text-foreground border-[3px] border-border px-4 py-2 text-xs font-black uppercase tracking-widest shadow-brutal-sm">
                  {ex.category.toUpperCase()}
                </div>
              </div>
              <button className="absolute top-6 right-6 h-12 w-12 border-[3px] border-border bg-background shadow-brutal-sm flex items-center justify-center text-foreground hover:bg-secondary transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5">
                <Bookmark className="h-6 w-6 stroke-[3px]" />
              </button>
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                 <div className="bg-background border-[4px] border-border px-8 py-4 font-black uppercase shadow-brutal flex items-center gap-3 text-xl italic tracking-tighter">
                    INIT PROTOCOL <ArrowUpRight className="h-6 w-6 stroke-[4px]" />
                 </div>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-foreground">{ex.name}</h3>
                <div className={`border-[3px] border-border px-3 py-1 text-[10px] font-black uppercase italic ${
                  ex.difficulty === 'Easy' ? 'bg-accent text-black' :
                  ex.difficulty === 'Medium' ? 'bg-secondary text-foreground' :
                  'bg-primary text-foreground'
                }`}>
                  {ex.difficulty}
                </div>
              </div>
              <p className="text-foreground/80 font-bold mb-8 flex-1 leading-relaxed text-lg">
                {ex.description}
              </p>
              <div className="pt-6 border-t-[4px] border-border flex items-center justify-between">
                <div className="flex gap-8">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                    <Clock className="h-5 w-5 stroke-[4px]" /> {ex.duration}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary">
                    <Activity className="h-5 w-5 stroke-[4px]" /> {ex.focus}
                  </div>
                </div>
                <Link to={`/session/${ex.id}`} className="p-4 border-[3px] border-border bg-primary shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <Play className="h-6 w-6 fill-foreground stroke-[3px]" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-32 border-[6px] border-border border-dashed bg-card shadow-brutal">
          <p className="text-4xl font-black uppercase italic mb-10 text-foreground tracking-tighter">ZERO MODULES FOUND</p>
          <button 
            className="brutal-btn-accent text-xl px-12 py-6"
            onClick={() => {setSearch(""); setActiveCategory("All");}}
          >
            PURGE FILTERS
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;