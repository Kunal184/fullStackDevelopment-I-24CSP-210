import api from './baseApi';

export const getProfile = () => api.get('/profile');
export const updateProfile = (profileData) => api.put('/profile', profileData);
export const uploadResume = (formData) => api.post('/profile/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
