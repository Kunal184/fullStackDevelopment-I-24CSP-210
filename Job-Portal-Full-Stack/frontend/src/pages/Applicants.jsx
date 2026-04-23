import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApplicantsForJob, updateApplicationStatus } from '../api/applicationApi';
import Navbar from '../components/Navbar';

function Applicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const res = await getApplicantsForJob(jobId);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      fetchApplicants();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColors = {
    PENDING: 'bg-zinc-300',
    REVIEWED: 'bg-blue-400',
    ACCEPTED: 'bg-black',
    REJECTED: 'bg-red-400'
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto p-12">
        <header className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-black/[0.08] pb-12">
          <div className="max-w-xl">
            <Link to="/dashboard/employer" className="text-xs font-bold uppercase tracking-widest text-muted hover:text-black transition-all mb-4 block">← Back to Workspace</Link>
            <h1 className="text-5xl font-bold mb-4 tracking-tighter">Candidate Pool.</h1>
            <p className="text-muted text-lg font-medium italic italic-font">Evaluating the individuals who want to join your mission.</p>
          </div>
        </header>
        
        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-12">
            {applications.map(app => (
              <div key={app.id} className="border-t border-black/[0.08] pt-12 flex flex-col lg:flex-row justify-between items-start gap-12 group transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="badge-dot">
                      <div className={`dot ${statusColors[app.status] || 'bg-zinc-300'}`}></div>
                      <span>{app.status.toLowerCase()}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-bold mb-2 tracking-tighter">{app.seeker.user.name}</h3>
                  <p className="text-muted font-medium mb-6 italic italic-font">{app.seeker.user.email}</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8">
                    {app.seeker.skills?.split(',').map(skill => (
                      <span key={skill} className="text-xs font-bold uppercase tracking-widest text-black/40 border-b border-black/[0.05] pb-1">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                  
                    <a 
                      href={`http://127.0.0.1:8080/uploads/${app.seeker.resumeUrl}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-bold uppercase tracking-[0.2em] underline underline-offset-8 decoration-1 decoration-black/20 hover:decoration-black transition-all"
                    >
                      Open Portfolio / Resume ↗
                    </a>
                  )}
                </div>
                
                <div className="flex flex-col gap-4 w-full lg:w-auto pt-4 lg:pt-14">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-4 ml-1">Update Pipeline Status</label>
                    <select 
                      value={app.status} 
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="px-8 py-4 border border-black/[0.12] bg-transparent outline-none focus:border-black transition-all text-[11px] uppercase tracking-widest font-bold cursor-pointer appearance-none text-center"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWED">Reviewed</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <div className="py-40 text-center border-t border-dashed border-black/[0.1]">
                <p className="text-xl text-muted italic italic-font">No applications received yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Applicants;
