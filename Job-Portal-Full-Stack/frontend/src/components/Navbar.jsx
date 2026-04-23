import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-black/[0.08] px-8 py-5 flex justify-between items-center sticky top-0 z-50 backdrop-blur-sm">
      <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
        Job<span className="text-muted font-normal">Portal</span>
      </Link>
      <div className="flex items-center gap-8 text-[13px] font-medium tracking-wide">
        <Link to="/jobs" className="text-muted hover:text-foreground transition-colors uppercase tracking-widest">Browse Jobs</Link>
        {user ? (
          <div className="flex items-center gap-6 border-l border-black/[0.08] pl-6">
            {user.role === 'SEEKER' && <Link to="/dashboard/seeker" className="text-muted hover:text-foreground transition-colors uppercase tracking-widest">Applications</Link>}
            {user.role === 'EMPLOYER' && <Link to="/dashboard/employer" className="text-muted hover:text-foreground transition-colors uppercase tracking-widest">Overview</Link>}
            <Link to="/profile" className="text-muted hover:text-foreground transition-colors uppercase tracking-widest">{user.name}</Link>
            <button 
              onClick={logout} 
              className="text-red-500 hover:text-red-600 font-bold transition-colors uppercase tracking-widest"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6 border-l border-black/[0.08] pl-6">
            <Link to="/login" className="text-muted hover:text-foreground transition-colors uppercase tracking-widest">Sign in</Link>
            <Link 
              to="/register" 
              className="px-5 py-2.5 border border-black/[0.12] rounded-none hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
