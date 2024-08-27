import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: 'http://192.168.0.100:3030'
})

instance.interceptors.request.use(async (config) => {
    config.headers.Authorization = await AsyncStorage.getItem('token')
    return config;
})

export default instance