var path = require('path');
var express = require('express');
var morgan = require('morgan');
const app = express();


app.use(express.static(path.join(__dirname, 'build')));


app.use(morgan('combined'));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 3000);