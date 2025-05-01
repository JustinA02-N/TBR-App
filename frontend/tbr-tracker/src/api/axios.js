import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-18-223-107-195.us-east-2.compute.amazonaws.com:4000'
});

export default api;
