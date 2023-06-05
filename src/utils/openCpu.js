import axios from 'axios';
import { R_SERVER_PORT, R_SERVER_URI } from '../setup';

export default async function openCpu(_package, method, params) {
  const url = `${R_SERVER_URI}:${R_SERVER_PORT}/ocpu/library/${_package}/R/${method}`;

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=86400',
    },
  };

  const response = await axios.post(url, params, config);

  return response.data;
}
