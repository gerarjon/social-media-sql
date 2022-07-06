import axios from "axios";

const API = {
  getPosts: () => {
    return axios.get(`/api/posts`)
  },
  getPost: (id) => {
    return axios.get(`/api/posts/byId/${id}`)
  },
  createPost: (data) => {
    return axios.post("/api/posts", data)
  },
  deletePost: (id) => {
    return axios.delete(`/api/posts/delete/${id}`)
  },
  createComment: (data) => {
    return axios.post("/api/comments", data)
  },
  deleteComment: (id) => {
    return axios.delete(`/api/comments/delete/${id}`)
  },
  getComments: (id) => {
    return axios.get(`/api/comments/${id}`);
  }
}

export default API;