import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authApi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-app-bg p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-12 bg-white border border-black/[0.08]">
        <h2 className="text-4xl font-bold mb-2 tracking-tighter">Sign in.</h2>
        <p className="text-muted mb-10 text-sm italic italic-font">Enter your credentials to access the platform.</p>
        
        {error && <p className="mb-8 text-red-500 text-xs font-bold uppercase tracking-widest leading-none">{error}</p>}
        
        <div className="mb-8">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3 italic-font">Email address</label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            className="w-full py-4 border-b border-black/[0.12] focus:border-black outline-none transition-all bg-transparent text-sm" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="mb-12">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3 italic-font">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full py-4 border-b border-black/[0.12] focus:border-black outline-none transition-all bg-transparent text-sm" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button className="w-full bg-app-fg text-app-bg py-5 font-bold hover:bg-zinc-800 transition-all text-xs uppercase tracking-[0.2em] leading-none mb-8">
          Continue
        </button>
        
        <p className="text-center text-muted text-xs uppercase tracking-widest">
          New here? <Link to="/register" className="text-app-fg hover:border-b border-black font-bold ml-1">Create account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
