const app = require('./src/app/index.js');

const PORT = 3005;

app.listen(PORT, (err) => {
  if (err) { 
    console.log('Error at server launch', err)
  }
  console.log(`Server running on port http://localhost:${PORT}`);
});
