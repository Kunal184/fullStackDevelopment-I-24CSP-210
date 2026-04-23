import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../api/jobApi';
import { applyToJob } from '../api/applicationApi';
import Navbar from '../components/Navbar';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await getJobById(id);
      setJob(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleApply = async () => {
    if (!user) return navigate('/login');
    if (user.role !== 'SEEKER') return alert('Only Job Seekers can apply');
    
    try {
      await applyToJob(id);
      alert('Applied successfully!');
      navigate('/dashboard/seeker');
    } catch (err) {
      alert('You have already applied to this job');
    }
  };

  if (loading) return (
    <div className="flex justify-center py-40">
      <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
    </div>
  );
  
  if (!job) return <div className="p-12 text-center text-muted italic">Role not found.</div>;

  const formatEnum = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace('_', ' ');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[1000px] mx-auto p-12 mt-12 pb-32">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 border-b border-black/[0.08] pb-16">
          <div className="max-w-2xl">
            <div className="badge-dot mb-6">
              <div className="dot bg-black"></div>
              <span>{formatEnum(job.jobType)}</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 tracking-tighter leading-tight">{job.title}</h1>
            <p className="text-2xl text-muted font-medium mb-2">{job.company.name}</p>
            <p className="text-sm text-muted uppercase tracking-[0.2em]">{job.location}</p>
          </div>
          <div className="lg:text-right space-y-2">
            <p className="text-xs text-muted uppercase tracking-widest leading-none">Status</p>
            <p className="text-sm font-bold">Open for applications</p>
            <div className="pt-4">
              <p className="text-xs text-muted uppercase tracking-widest leading-none">Posted</p>
              <p className="text-sm font-medium">{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted mb-8 italic italic-font">Description</h2>
            <div className="text-lg leading-[1.8] text-app-fg/90 whitespace-pre-wrap max-w-2xl">
              {job.description}
            </div>
            
            <div className="mt-24 flex gap-6">
              <button 
                onClick={handleApply} 
                className="px-12 py-5 bg-app-fg text-app-bg font-bold hover:bg-zinc-800 transition-all card-hover text-sm uppercase tracking-widest"
              >
                Apply for this role
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="px-8 py-5 border border-black/[0.12] text-app-fg font-bold hover:bg-black hover:text-white transition-all text-sm uppercase tracking-widest"
              >
                Go back
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l border-black/[0.08] lg:pl-12 space-y-12 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-4">Salary Range</p>
              <p className="text-xl font-medium tracking-tight">{job.salaryRange}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-4">Application Deadline</p>
              <p className="text-xl font-medium tracking-tight">{job.deadline}</p>
            </div>
            {job.company.website && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-4">Company site</p>
                <a href={job.company.website} target="_blank" rel="noreferrer" className="text-sm border-b border-black/10 hover:border-black transition-all font-semibold">
                  {job.company.website.replace('https://', '')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetails;
