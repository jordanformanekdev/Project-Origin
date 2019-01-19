import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://project-origin-a3dc8.firebaseio.com/'
});

export default instance;
