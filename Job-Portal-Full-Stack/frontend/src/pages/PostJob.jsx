import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/jobApi';
import Navbar from '../components/Navbar';

function PostJob() {
  const [formData, setFormData] = useState({ title: '', description: '', location: '', jobType: 'FULL_TIME', salaryRange: '', deadline: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(formData);
      navigate('/dashboard/employer');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[800px] mx-auto p-12 mt-12 mb-24">
        <header className="mb-20">
          <h1 className="text-5xl font-bold mb-6 tracking-tighter">Draft a new role.</h1>
          <p className="text-muted text-lg font-medium italic italic-font">Define the future of your team with clarity and precision.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-4 ml-1">Position Title</label>
              <input 
                type="text" 
                className="w-full p-0 py-4 border-b border-black/[0.12] bg-transparent outline-none focus:border-black transition-all text-xl font-medium placeholder:text-zinc-300" 
                placeholder="e.g. Lead Product Designer" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-4 ml-1">Location</label>
              <input 
                type="text" 
                className="w-full p-0 py-4 border-b border-black/[0.12] bg-transparent outline-none focus:border-black transition-all text-xl font-medium placeholder:text-zinc-300" 
                placeholder="Bangalore, India / Remote" 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-4 ml-1">Role Description</label>
            <textarea 
              className="w-full p-0 py-4 border-b border-black/[0.12] bg-transparent outline-none focus:border-black transition-all text-lg font-medium placeholder:text-zinc-300 min-h-[160px] leading-relaxed" 
              placeholder="Describe the mission, the impact, and the day-to-day..." 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-4 ml-1">Commitment</label>
              <select 
                className="w-full p-0 py-4 border-b border-black/[0.12] bg-transparent outline-none focus:border-black transition-all text-base font-medium appearance-none cursor-pointer" 
                value={formData.jobType} 
                onChange={(e) => setFormData({...formData, jobType: e.target.value})}
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-4 ml-1">Remuneration</label>
              <input 
                type="text" 
                className="w-full p-0 py-4 border-b border-black/[0.12] bg-transparent outline-none focus:border-black transition-all text-base font-medium placeholder:text-zinc-300" 
                placeholder="₹15L - ₹20L per annum" 
                value={formData.salaryRange} 
                onChange={(e) => setFormData({...formData, salaryRange: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-4 ml-1">Closing Date</label>
              <input 
                type="date" 
                className="w-full p-0 py-4 border-b border-black/[0.12] bg-transparent outline-none focus:border-black transition-all text-base font-medium cursor-pointer" 
                value={formData.deadline} 
                onChange={(e) => setFormData({...formData, deadline: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="flex gap-8 pt-12">
            <button className="px-12 py-5 bg-app-fg text-app-bg font-bold hover:bg-zinc-800 transition-all text-xs uppercase tracking-[0.2em] leading-none card-hover">
              Publish Role
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="px-8 py-5 text-muted font-bold hover:text-black transition-all text-xs uppercase tracking-[0.2em]"
            >
              Discard Draft
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostJob;
