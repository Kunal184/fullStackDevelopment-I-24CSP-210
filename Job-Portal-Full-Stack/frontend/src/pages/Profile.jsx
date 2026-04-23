import { useState, useEffect } from 'react';
import { getProfile, updateProfile, uploadResume } from '../api/profileApi';
import Navbar from '../components/Navbar';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      alert('Profile updated!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadResume(formData);
      alert('Resume uploaded!');
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-blue-600 p-10 text-white flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">{user.name}</h1>
              <p className="text-blue-100 text-lg">{user.email} • {user.role}</p>
            </div>
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-blue-400">
              {user.name.charAt(0)}
            </div>
          </div>

          <div className="p-10">
            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Professional Information</h2>
              {user.role === 'SEEKER' ? (
                <>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Skills (comma separated)</label>
                    <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={profile.skills || ''} onChange={(e) => setProfile({...profile, skills: e.target.value})} placeholder="Java, React, MySQL" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Education</label>
                    <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={profile.education || ''} onChange={(e) => setProfile({...profile, education: e.target.value})} placeholder="B.Tech in Computer Science" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Company Name</label>
                    <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={profile.name || ''} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Location</label>
                    <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={profile.location || ''} onChange={(e) => setProfile({...profile, location: e.target.value})} />
                  </div>
                </>
              )}
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Update Profile</button>
            </form>

            {user.role === 'SEEKER' && (
              <div className="mt-12 bg-slate-50 p-8 rounded-3xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">Resume Management 📎</h2>
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Upload New Resume (PDF)</label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" accept=".pdf" />
                    </div>
                    <button onClick={handleFileUpload} className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 transition">Upload Resume</button>
                </div>
                {profile.resumeUrl && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center justify-between">
                    <span className="text-green-700 font-medium">Currently on file: {profile.resumeUrl}</span>
                    <a href={`http://localhost:8080/uploads/resumes/${profile.resumeUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Download ⬇</a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
