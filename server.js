const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');

const app = express();
app.use(cors());

app.get('/api/posts', (req, res) => {
  axios
      .get(
        `https://api.cosmicjs.com/v1/${
          config.bucket.slug
        }/object-type/posts?sort=created_at`
      )
      .then(response => {
        res.send(response.data.objects);
      });
})


app.get('/api/posts/:slug', (req, res) => {  
  axios
  .get(
    `https://api.cosmicjs.com/v1/${
      config.bucket.slug
    }/object/${req.params.slug}?sort=created_at`
  )
  .then(response => {
    res.send(response.data.object);
  });
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = config.app.port;
app.listen(port, () => `Server running on port ${port}`);