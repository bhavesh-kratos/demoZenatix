import axios from './baseUrl';

//it has static argument to pass
export const apiData = () => axios.post(`/2/files/download`).then(res => res.data);

