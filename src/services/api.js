import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const login = async (email, password) => {
    try {
        const data = {
            grant_type: 'bearer',
            email,
            password,
        };


        const response = await api.post('/login', data);

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const register = async (userData) => {
    try {
        const response = await api.post('/signin', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getActivities = async (token) => {
    try {
        const response = await api.get('/activities', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getActivityDetail = async (etkinlikId, token) => {
    try {
        const response = await api.get(`/activity-detail?etkinlikId=${etkinlikId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getUserInfo = async (token, userId) => {
    try {
        const response = await api.get(`/user-info?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const addComment = async (token, commentData) => {
    try {
        const response = await api.post('/add-comment', commentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};



export const joinEvent = async (token, commentData) => {
    try {
        const response = await api.post('/join-activity', commentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const createEvent = async (token, commentData) => {
    try {
        const response = await api.post('/add-activity', commentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const deleteActivity = async (token, id) => {
    try {
        const response = await api.delete(`/activity?etkinlikId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const updateActivity = async (token, commentData,) => {
    try {
        const response = await api.put(`/activity`, commentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};



export default api;
