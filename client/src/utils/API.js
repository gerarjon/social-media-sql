import axios from "axios";

const API = {
  getPosts: () => {
    return axios.get(`/api/posts`)
  },
  getPost: (id) => {
    return axios.get(`/api/posts/byId/${id}`)
  },
  createPost: (data) => {
    return axios.post("/api/posts", data, 
    { 
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
  },
  updatePost: (data, id) => {
    return axios.put(`/api/posts/update/${id}`, data, 
    {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
  },
  deletePost: (id) => {
    return axios.delete(`/api/posts/delete/${id}`)
  },
  createComment: (data) => {
    return axios.post("/api/comments", data,
    { 
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
  },
  deleteComment: (id) => {
    return axios.delete(`/api/comments/delete/${id}`,
    { 
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
  },
  getComments: (id) => {
    return axios.get(`/api/comments/${id}`);
  },
  signup: (data) => {
    return axios.post(`/api/user/signup`, data)
  },
  login: (data) => {
    return axios.post(`/api/user/login`, data)
  },
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  getUserPosts: (id) => {
    return axios.get(`/api/user/${id}/posts`);
  },
  getUserComments: (id) => {
    return axios.get(`/api/user/${id}/comments`);
  }
}

export default API;