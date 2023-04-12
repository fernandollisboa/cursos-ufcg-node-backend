import app from './app.js';
import './setup.js';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`eae rapaziada, porta ${port}`);
});
