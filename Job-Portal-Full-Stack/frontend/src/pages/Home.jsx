import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Navbar />
      <main className="px-8 pt-24 pb-32 max-w-[1400px] mx-auto">
        {/* Asymmetric Hero Section */}
        <section className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="flex-1 max-w-4xl">
            <h1 className="text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] font-bold text-app-fg mb-10">
              The modern way <br />
              <span className="text-muted italic font-medium">to build your</span> <br />
              working life.
            </h1>
            <p className="text-xl text-muted max-w-xl mb-12 leading-relaxed">
              A curated platform for high-impact roles. No clutter, no noise. Just the next step in your professional narrative.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/jobs" className="px-8 py-4 bg-app-fg text-app-bg font-medium hover:bg-zinc-800 transition-all card-hover">
                Explore listings
              </Link>
              {!user && (
                <Link to="/register" className="px-8 py-4 border border-black/[0.12] text-app-fg font-medium hover:bg-black hover:text-white transition-all card-hover">
                  Join the platform
                </Link>
              )}
            </div>
          </div>
          
          {/* Decorative Asymmetric Element */}
          <div className="hidden lg:block w-full lg:w-[400px] h-[600px] bg-zinc-100 p-12 relative border border-black/[0.05]">
             <div className="absolute top-12 left-[-40px] bg-white p-8 border border-black/[0.08] max-w-[280px] card-hover">
               <div className="flex items-center gap-2 mb-4">
                 <div className="dot bg-green-500"></div>
                 <span className="text-[10px] uppercase tracking-widest text-muted">active now</span>
               </div>
               <p className="text-sm font-semibold mb-1">Senior Product Designer</p>
               <p className="text-xs text-muted">Mountain View, CA • $140k+</p>
             </div>
             
             <div className="h-full flex flex-col justify-end">
                <span className="text-[120px] font-bold text-zinc-200 leading-none select-none">01</span>
                <p className="text-xs uppercase tracking-[0.2em] text-muted mt-4">Curated opportunities</p>
             </div>
          </div>
        </section>

        {/* Dynamic Feature Grid - Asymmetric */}
        <section className="mt-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 pt-8">
              <h2 className="text-3xl font-bold mb-6">Designed for clarity.</h2>
              <p className="text-muted leading-relaxed">
                We believe that finding a job shouldn't feel like a job. Our interface is stripped back to focus on what matters: the work, the team, and the mission.
              </p>
            </div>
            
            <div className="lg:col-span-1"></div>

            <div className="lg:col-span-6 space-y-12">
              <div className="border-t border-black/[0.08] pt-8 group">
                <span className="text-xs font-bold text-muted mb-4 block group-hover:text-foreground transition-colors uppercase tracking-widest">01 / Seekers</span>
                <p className="text-xl font-medium mb-4">Single-click application flow with personalized dashboards to track every detail of your journey.</p>
              </div>
              <div className="border-t border-black/[0.08] pt-8 group">
                <span className="text-xs font-bold text-muted mb-4 block group-hover:text-foreground transition-colors uppercase tracking-widest">02 / Employers</span>
                <p className="text-xl font-medium mb-4">Sophisticated talent management tools that respect your time and prioritize the right candidates.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
