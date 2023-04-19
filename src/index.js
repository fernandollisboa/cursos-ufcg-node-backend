/* eslint-disable no-undef */
import app from './app.js';
import { API_PORT } from './setup.js';

const port = API_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
