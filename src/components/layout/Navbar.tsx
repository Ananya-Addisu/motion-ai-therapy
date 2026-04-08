import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Activity, 
  LayoutDashboard, 
  Library, 
  LogOut, 
  User as UserIcon,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  user: { role: 'patient' | 'clinician' } | null;
  logout: () => void;
}

const Navbar = ({ user, logout }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = user?.role === 'patient' ? [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Exercises', path: '/library', icon: Library },
  ] : user?.role === 'clinician' ? [
    { name: 'Patients', path: '/clinician', icon: UserIcon },
    { name: 'Library', path: '/library', icon: Library },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-[3px] border-border bg-background shadow-brutal-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center border-[3px] border-border bg-primary text-foreground shadow-brutal-sm transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter text-foreground italic">
              Rehab<span className="text-primary underline">AI</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary underline decoration-[3px] underline-offset-8' : 'text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border-[3px] border-border px-3 py-1 bg-card text-foreground shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <div className="flex gap-4">
              <Link 
                to="/auth" 
                className="text-sm font-black uppercase tracking-widest px-4 py-2 hover:underline decoration-[3px]"
              >
                Sign In
              </Link>
              <Link 
                to="/auth" 
                className="brutal-btn-secondary py-2"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border-[3px] border-border bg-card text-foreground shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t-[3px] border-border bg-background"
          >
            <div className="space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 border-[3px] border-border p-4 text-lg font-black uppercase bg-card text-foreground shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="flex w-full items-center gap-3 border-[3px] border-border p-4 text-lg font-black uppercase bg-destructive text-foreground shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                   <Link 
                    to="/auth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center border-[3px] border-border p-4 font-black uppercase bg-card text-foreground shadow-brutal-sm"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/auth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center border-[3px] border-border p-4 font-black uppercase bg-secondary text-foreground shadow-brutal-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;