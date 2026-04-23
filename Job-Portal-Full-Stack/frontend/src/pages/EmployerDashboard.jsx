import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyJobs, deleteJob } from '../api/jobApi';
import Navbar from '../components/Navbar';

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const res = await getMyJobs(); 
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await deleteJob(id);
      fetchMyJobs();
    }
  };

  const formatEnum = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace('_', ' ');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto p-12">
        <header className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-black/[0.08] pb-12">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-4 tracking-tighter">Your Workspace</h1>
            <p className="text-muted text-lg font-medium italic italic-font">Manage your active listings and find your next high-impact teammate.</p>
          </div>
          <Link to="/post-job" className="bg-app-fg text-app-bg px-10 py-5 font-bold hover:bg-zinc-800 transition-all text-xs uppercase tracking-[0.2em] leading-none card-hover">
            Create new role
          </Link>
        </header>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-12">
            {jobs.map(job => (
              <div key={job.id} className="border-t border-black/[0.08] pt-12 flex flex-col md:flex-row justify-between items-start gap-12 group transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="badge-dot">
                      <div className="dot bg-black"></div>
                      <span>{formatEnum(job.jobType)}</span>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-muted">{job.location}</span>
                  </div>
                  
                  <h3 className="text-4xl font-bold mb-4 tracking-tighter group-hover:underline underline-offset-8 decoration-1 decoration-black/10 transition-all">{job.title}</h3>
                  <div className="flex flex-wrap gap-8 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted text-[10px] uppercase tracking-widest font-bold mb-1">Posted</span>
                      <span className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted text-[10px] uppercase tracking-widest font-bold mb-1">Deadline</span>
                      <span className="font-medium">{job.deadline}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4 md:pt-14">
                  <Link 
                    to={`/applicants/${job.id}`} 
                    className="px-8 py-4 border border-black/[0.12] text-app-fg font-bold hover:bg-black hover:text-white transition-all text-[10px] uppercase tracking-widest card-hover"
                  >
                    View Applicants
                  </Link>
                  <button 
                    onClick={() => handleDelete(job.id)} 
                    className="px-8 py-4 border border-red-500/20 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all text-[10px] uppercase tracking-widest"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <div className="py-40 text-center border-t border-dashed border-black/[0.1]">
                <p className="text-xl text-muted italic italic-font mb-8">No listings yet.</p>
                <Link to="/post-job" className="text-app-fg font-bold underline underline-offset-4 hover:decoration-2">
                  Post your first role to get started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default EmployerDashboard;
