import api from './baseApi';

export const getAllJobs = (search = '') => api.get(`/jobs?search=${search}`);
export const getMyJobs = () => api.get('/jobs/my');
export const getJobById = (id) => api.get(`/jobs/${id}`);
export const createJob = (jobData) => api.post('/jobs', jobData);
export const updateJob = (id, jobData) => api.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
