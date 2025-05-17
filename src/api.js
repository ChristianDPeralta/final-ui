import axios from "axios";

const API_BASE = "https://final-api-vr8u.onrender.com/api/posts";
const COMMENT_BASE = "https://final-api-vr8u.onrender.com/api/comments";
const USER_BASE = "https://final-api-vr8u.onrender.com/api/users";

// --- Post-related APIs ---
export const getPosts = () => axios.get(API_BASE);
export const createPost = (data) => axios.post(API_BASE, data);
export const updatePost = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deletePost = (id) => axios.delete(`${API_BASE}/${id}`);

// --- Comment-related APIs ---
export const getComments = (postId) =>
  axios.get(`${COMMENT_BASE}/post/${postId}`);

export const addComment = (commentData) =>
  axios.post(`${COMMENT_BASE}`, commentData);

export const deleteComment = (commentId) =>
  axios.delete(`${COMMENT_BASE}/${commentId}`);

// --- User/Profile-related APIs ---
export const getUserProfile = (userId) =>
  axios.get(`${USER_BASE}/${userId}`);

export const updateUserProfile = (userId, profileData) =>
  axios.put(`${USER_BASE}/${userId}/profile`, profileData);
