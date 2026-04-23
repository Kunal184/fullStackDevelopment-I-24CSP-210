import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs } from '../api/jobApi';
import Navbar from '../components/Navbar';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (query = '') => {
    setLoading(true);
    try {
      const res = await getAllJobs(query);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
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
            <h1 className="text-5xl font-bold mb-4 tracking-tighter">Opportunities</h1>
            <p className="text-muted text-lg">Browse a selection of roles curated for clarity and purpose.</p>
          </div>
          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-4">
            <input 
              type="text" 
              placeholder="Title or location..." 
              className="px-6 py-4 border border-black/[0.12] rounded-none w-full md:w-96 outline-none focus:border-black transition-all bg-transparent text-sm" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <button className="bg-app-fg text-app-bg px-10 py-4 font-semibold hover:bg-zinc-800 transition-all text-sm uppercase tracking-widest leading-none">Filter</button>
          </form>
        </header>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
            {jobs.map((job, index) => (
              <div 
                key={job.id} 
                className={`group border-t border-black/[0.08] pt-10 card-hover ${index % 3 === 0 ? 'lg:col-span-1' : ''}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="badge-dot">
                    <div className={`dot ${job.jobType === 'FULL_TIME' ? 'bg-zinc-900' : 'bg-zinc-300'}`}></div>
                    <span>{formatEnum(job.jobType)}</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted">{job.location}</span>
                </div>
                
                <Link to={`/jobs/${job.id}`}>
                  <h3 className="text-3xl font-bold mb-4 group-hover:underline underline-offset-8 decoration-1 decoration-black/20 decoration-dashed transition-all">
                    {job.title}
                  </h3>
                </Link>
                <p className="text-muted line-clamp-2 mb-8 leading-relaxed max-w-lg">{job.description}</p>
                
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm font-semibold tracking-tight">{job.salaryRange}</span>
                  <Link 
                    to={`/jobs/${job.id}`} 
                    className="text-xs font-bold uppercase tracking-widest py-2 border-b border-black/10 hover:border-black transition-all"
                  >
                    View Role
                  </Link>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <p className="col-span-full text-center text-muted py-20 text-lg italic italic-font">No matches found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Jobs;
