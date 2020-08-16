import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.itedu.me/',
    timeout: 10000,
});