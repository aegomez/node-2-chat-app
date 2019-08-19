const path = require('path');

const express = require('express');

const port = process.env.PORT || 9000;
const publicPath = path.join(__dirname, '../public');
const app = express();

// static middleware
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log('Server is up on port ' + port)
});
