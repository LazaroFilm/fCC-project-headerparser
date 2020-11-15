// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const useragent = require('express-useragent');
const expressPublicIp = require('express-public-ip');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


// my code
app.enable('trust proxy');
 
app.use(expressPublicIp());
app.use(useragent.express());
app.set('trust proxy', true)

app.get("/api/whoami", (req, res) => {
  const ipaddress = req.ip;
  const language = req.headers["accept-language"];
  const software = req.useragent.source;
  res.json({ ipaddress, language, software })
})


// end of my code

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
