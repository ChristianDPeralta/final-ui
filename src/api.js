import axios from "axios";

const API_BASE = "https://final-api-vr8u.onrender.com/api/posts";
const USER_BASE = "https://final-api-vr8u.onrender.com/api/users";

// --- Post-related APIs ---
export const getPosts = () => axios.get(API_BASE);
export const createPost = (data) => axios.post(API_BASE, data);
export const updatePost = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deletePost = (id) => axios.delete(`${API_BASE}/${id}`);

// --- Comment-related APIs ---
export const getComments = (postId) =>
  axios.get(`${API_BASE}/${postId}/comments`);

export const addComment = (postId, commentData, userId) =>
  axios.post(
    `${API_BASE}/${postId}/comments`,
    commentData,
    { params: { userId } }
  );

export const deleteComment = (postId, commentId) =>
  axios.delete(`${API_BASE}/${postId}/comments/${commentId}`);

// --- User/Profile-related APIs ---
export const getUserProfile = (userId) =>
  axios.get(`${USER_BASE}/${userId}`);

export const updateUserProfile = (userId, profileData) =>
  axios.put(`${USER_BASE}/${userId}/profile`, profileData);
