import instance from './baseUrl';

// it has static argument to pass
// export const apiData = () => instance.post(`/2/files/download`).then(res => res.data);

export const uploadImage = (form) => instance.post('/3/image',form).then(res => res.data);
