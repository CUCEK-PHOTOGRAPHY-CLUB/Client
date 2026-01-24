// src/services/api.js

import axios from 'axios';

// Create an Axios instance with a base URL from environment variables
// It's better practice to use environment variables for the base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://cpc-photography-api.onrender.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to every request if it exists in localStorage
apiClient.interceptors.request.use(
  (config) => {
    // Check for admin or member token
    const token = localStorage.getItem('adminToken') || localStorage.getItem('memberToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Generic API Functions ---
const get = (endpoint, params = {}) => apiClient.get(endpoint, { params });
const create = (endpoint, data) => apiClient.post(endpoint, data);
const update = (endpoint, id, data) => apiClient.put(`${endpoint}/${id}`, data);
const patch = (endpoint, id, data) => apiClient.patch(`${endpoint}/${id}`, data);
const remove = (endpoint, id) => apiClient.delete(`${endpoint}/${id}`);

// --- Authentication API Service ---
export const authApi = {
  // Admin login
  adminLogin: (credentials) => apiClient.post('/auth/login', credentials),
  // Member login (after approval)
  memberLogin: (credentials) => apiClient.post('/auth/member-login', credentials),
  // Verify token validity
  verifyToken: () => get('/auth/verify'),
  // Get current user profile
  getMe: () => get('/auth/me'),
  // Change user password
  changePassword: (passwordData) => apiClient.put('/auth/change-password', passwordData),
  // Logout user
  logout: () => apiClient.post('/auth/logout'),
};

// --- Member Registration (Public) ---
export const memberApi = {
  // Submit a new member application
  submitApplication: (applicationData) => create('/member/register', applicationData),
  // Check application status by email
  checkStatus: (email) => get(`/member/status/${email}`),
};

// --- Admin Member Application Management ---
export const memberApplicationsApi = {
  // Get all applications with optional filtering and pagination
  getAll: (params) => get('/member-applications', params), // e.g., { status: 'pending', page: 1, limit: 10 }
  // Get all pending applications
  getPending: () => get('/member-applications/pending'),
  // Get details for a single application
  getById: (id) => get(`/member-applications/${id}`),
  // Approve an application
  approve: (id, adminNotes) => apiClient.put(`/member-applications/${id}/approve`, { adminNotes }),
  // Reject an application
  reject: (id, adminNotes) => apiClient.put(`/member-applications/${id}/reject`, { adminNotes }),
};

// --- Admin Dashboard API Service ---
export const adminApi = {
  // Get dashboard statistics
  getDashboardStats: () => get('/admin/dashboard/stats'),
  // Get system health status
  getSystemHealth: () => get('/admin/system/health'),
};

// --- User Management API Service ---
export const usersApi = {
  // Get all users with pagination
  getAll: (page = 1, limit = 10) => get('/users', { page, limit }),
  // Get a single user by ID
  getById: (id) => get(`/users/${id}`),
  // Create a new user (if applicable)
  create: (data) => create('/users', data),
  // Update user details
  update: (id, data) => update('/users', id, data),
  // Delete a user
  delete: (id) => remove('/users', id),
  // Update user status (active/inactive)
  updateStatus: (id, isActive) => patch('/users', `${id}/status`, { isActive }),
  // Update user role
  updateRole: (id, role) => patch('/users', `${id}/role`, { role }),
};

// --- Content Management Services ---

export const heroApi = {
  getAll: () => get('/hero'),
  create: (data) => create('/hero', data),
  update: (id, data) => update('/hero', id, data),
  delete: (id) => remove('/hero', id),
};

export const eventsApi = {
  getAll: (page = 1, limit = 10) => get('/events', { page, limit }),
  getOne: (id) => get(`/events/${id}`),
  create: (data) => create('/events', data),
  update: (id, data) => update('/events', id, data),
  delete: (id) => remove('/events', id),
};

export const teamApi = {
  getAll: (page = 1, limit = 10) => get('/team', { page, limit }),
  create: (data) => create('/team', data),
  update: (id, data) => update('/team', id, data),
  delete: (id) => remove('/team', id),
};

export const testimonialsApi = {
  getAll: () => get('/testimonials'),
  create: (data) => create('/testimonials', data),
  update: (id, data) => update('/testimonials', id, data),
  delete: (id) => remove('/testimonials', id),
};

export const instagramApi = {
  getAll: () => get('/instagram'),
  create: (data) => create('/instagram', data),
  update: (id, data) => update('/instagram', id, data),
  delete: (id) => remove('/instagram', id),
};

export const galleryApi = {
  getAll: (page = 1, limit = 10) => get('/gallery', { page, limit }),
  create: (data) => create('/gallery', data),
  update: (id, data) => update('/gallery', id, data),
  delete: (id) => remove('/gallery', id),
};

export const videoApi = {
  getAll: (page = 1, limit = 10) => get('/video', { page, limit }),
  getById: (videoId) => get(`/video/${videoId}`),
  create: (data) => create('/video', data),
  update: (videoId, data) => patch('/video', videoId, data), // Assuming PATCH for partial updates
  delete: (videoId) => remove('/video', videoId),
  getForEvent: (eventId, page = 1, limit = 10) => get(`/events/${eventId}/videos`, { page, limit }),
};

// --- Public API Services (No Auth Required) ---
export const publicApi = {
  getGallery: (page = 1, limit = 20) => get('/public/gallery', { page, limit }),
  getEvents: (page = 1, limit = 10) => get('/public/events', { page, limit }),
  getTeam: () => get('/public/team'),
  getMemberProfile: (userId) => get(`/public/members/${userId}`),
  getMemberGallery: (userId, params = {}) => get(`/public/gallery/user/${userId}`, params),
};


// --- Member Profile API Service (Requires Auth) ---
export const memberProfileApi = {
  getMyProfile: () => get('/member/profile'),
  updateProfile: (data) => apiClient.put('/member/profile', data),
  updatePhoto: (photoUrl) => apiClient.put('/member/profile/photo', { profile_photo_url: photoUrl }),
  changePassword: (data) => apiClient.put('/member/profile/password', data),
};

export default apiClient;