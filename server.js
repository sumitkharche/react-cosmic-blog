const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');
var bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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


app.post('/', function (request, response) {

  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic YWUzYTRkNTAtYmRlNi00ZDkyLThhYWEtNjM1ZGZlYzRjMDQw"
  };

  var notificationType = request.body.type === 'object.edited.published' ? "Article Updated!" : "New Post Published!";

  var data = {
    app_id: "762e0b6b-908d-427f-bd7b-e0c21b9c8622",
    headings: { "en": notificationType },
    contents: { "en": request.body.data.title },
    included_segments: ["All"],
    url: `https://young-citadel-29154.herokuapp.com/${request.body.data.slug}`
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function (res) {
    res.on('data', function (data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function (e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();

  //respose.send('POST request to homepage!');
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = config.app.port;
app.listen(port, () => `Server running on port ${port}`);