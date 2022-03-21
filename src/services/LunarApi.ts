import axios from 'axios';

const LunarApi = axios.create({});

LunarApi.defaults.withCredentials = true;

export { LunarApi };
