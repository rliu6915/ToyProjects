import axios from 'axios';

const url = 'https://api.openweathermap.org/data/2.5';

const apiKey = process.env.REACT_APP_API_KEY;

const getOneCity = (capital) => {
    const request = axios.get(`${url}/weather?q=${capital}&appid=${apiKey}`);
    return request.then(response => response.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getOneCity };