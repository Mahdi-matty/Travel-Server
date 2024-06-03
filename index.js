const express = require('express');
const routes = require('./controllers')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
    });
  });