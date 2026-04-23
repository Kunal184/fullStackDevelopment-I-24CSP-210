import api from './baseApi';

export const applyToJob = (jobId) => api.post(`/applications?jobId=${jobId}`);
export const getMyApplications = () => api.get('/applications/my');
export const getApplicantsForJob = (jobId) => api.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = (id, status) => api.put(`/applications/${id}/status?status=${status}`);
