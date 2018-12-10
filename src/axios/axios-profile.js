import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-a45c6.firebaseio.com/'
});

export default instance;
