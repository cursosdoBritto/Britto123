import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Templates API
export const templatesApi = {
  getAll: async (params = {}) => {
    const response = await api.get('/templates/', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },
  
  create: async (template) => {
    const response = await api.post('/templates/', template);
    return response.data;
  },
  
  update: async (id, template) => {
    const response = await api.put(`/templates/${id}`, template);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/templates/${id}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/templates/categories/list');
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/templates/stats/summary');
    return response.data;
  }
};

// Designs API
export const designsApi = {
  getAll: async (params = {}) => {
    const response = await api.get('/designs/', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/designs/${id}`);
    return response.data;
  },
  
  create: async (design) => {
    const response = await api.post('/designs/', design);
    return response.data;
  },
  
  update: async (id, design) => {
    const response = await api.put(`/designs/${id}`, design);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/designs/${id}`);
    return response.data;
  },
  
  duplicate: async (id) => {
    const response = await api.post(`/designs/${id}/duplicate`);
    return response.data;
  },
  
  toggleFavorite: async (id) => {
    const response = await api.patch(`/designs/${id}/favorite`);
    return response.data;
  },
  
  getUserStats: async (userId) => {
    const response = await api.get(`/designs/user/${userId}/stats`);
    return response.data;
  }
};

// Users API
export const usersApi = {
  getAll: async () => {
    const response = await api.get('/users/');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  create: async (user) => {
    const response = await api.post('/users/', user);
    return response.data;
  },
  
  update: async (id, user) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
  
  getProfile: async (id) => {
    const response = await api.get(`/users/${id}/profile`);
    return response.data;
  }
};

// Export API
export const exportApi = {
  exportDesign: async (designId, format = 'png') => {
    const response = await api.post(`/export/design/${designId}`, { 
      designId, 
      format 
    }, {
      responseType: 'blob'
    });
    return response.data;
  },
  
  exportDesignBase64: async (designId, format = 'png') => {
    const response = await api.post(`/export/design/${designId}/base64`, { 
      designId, 
      format 
    });
    return response.data;
  },
  
  getFormats: async () => {
    const response = await api.get('/export/formats');
    return response.data;
  },
  
  batchExport: async (designIds, format = 'png') => {
    const response = await api.post('/export/batch', {
      design_ids: designIds,
      export_format: format
    });
    return response.data;
  }
};

// Upload API
export const uploadApi = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  uploadMultipleImages: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    const response = await api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getUploadInfo: async () => {
    const response = await api.get('/upload/info');
    return response.data;
  },
  
  deleteImage: async (imageId) => {
    const response = await api.delete(`/upload/image/${imageId}`);
    return response.data;
  }
};

// Health check
export const healthApi = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;