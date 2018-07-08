import axios from 'axios';

// Facing some problem with http method to get data, switching with dropbox sdk instead
const API_BASE_URL = 'https://content.dropboxapi.com'; //LATER ONWARDS WE WILL MAKE A Config file and place it in .gitignore
// which will contain all of the varying environment data, like this
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {'Dropbox-API-Arg': '{"path":"/Untitled spreadsheet.xlsx"}' }
});
instance.defaults.headers.common.authorization = `Bearer DIXgg4krJjAAAAAAAAAAZLQRqproldmwqgh-dvCgp23dSDNqBIdvjNqpiqg0WQea`;

export default instance;


