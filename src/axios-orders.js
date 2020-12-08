import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-eca15.firebaseio.com/'
});

export default instance;
