import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authApi';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'SEEKER' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Email might already be taken.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-app-bg p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-xl p-12 bg-white border border-black/[0.08]">
        <h2 className="text-4xl font-bold mb-2 tracking-tighter">Register.</h2>
        <p className="text-muted mb-12 text-sm italic italic-font">Join the curated platform for modern professionals.</p>
        
        {error && <p className="mb-8 text-red-500 text-xs font-bold uppercase tracking-widest leading-none">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
          <div className="md:col-span-1">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3 italic-font">Full name</label>
            <input 
              type="text" 
              className="w-full py-4 border-b border-black/[0.12] focus:border-black outline-none transition-all bg-transparent text-sm" 
              placeholder="John Doe" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3 italic-font">Email address</label>
            <input 
              type="email" 
              className="w-full py-4 border-b border-black/[0.12] focus:border-black outline-none transition-all bg-transparent text-sm" 
              placeholder="john@example.com" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3 italic-font">Password</label>
            <input 
              type="password" 
              className="w-full py-4 border-b border-black/[0.12] focus:border-black outline-none transition-all bg-transparent text-sm" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
        </div>

        <div className="mb-16">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-6 italic-font">Account type</label>
          <div className="flex gap-12">
            <button 
              type="button" 
              onClick={() => setFormData({...formData, role: 'SEEKER'})} 
              className="flex items-center gap-3 group"
            >
              <div className={`w-3 h-3 rounded-full border border-black transition-all ${formData.role === 'SEEKER' ? 'bg-black' : 'bg-transparent group-hover:bg-black/5'}`}></div>
              <span className={`text-xs font-bold uppercase tracking-widest ${formData.role === 'SEEKER' ? 'text-black' : 'text-muted'}`}>Job Seeker</span>
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, role: 'EMPLOYER'})} 
              className="flex items-center gap-3 group"
            >
              <div className={`w-3 h-3 rounded-full border border-black transition-all ${formData.role === 'EMPLOYER' ? 'bg-black' : 'bg-transparent group-hover:bg-black/5'}`}></div>
              <span className={`text-xs font-bold uppercase tracking-widest ${formData.role === 'EMPLOYER' ? 'text-black' : 'text-muted'}`}>Employer</span>
            </button>
          </div>
        </div>

        <button className="w-full bg-app-fg text-app-bg py-6 font-bold hover:bg-zinc-800 transition-all text-xs uppercase tracking-[0.2em] leading-none mb-8">
          Create account
        </button>
        
        <p className="text-center text-muted text-xs uppercase tracking-widest">
          Existing user? <Link to="/login" className="text-app-fg hover:border-b border-black font-bold ml-1">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
