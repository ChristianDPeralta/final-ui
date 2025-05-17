import axios from "axios";

const API_BASE = "https://final-api-vr8u.onrender.com/api/posts";

export const getPosts = () => axios.get(API_BASE);
export const createPost = (data) => axios.post(API_BASE, data);
export const updatePost = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deletePost = (id) => axios.delete(`${API_BASE}/${id}`);
