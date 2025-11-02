const express = require('express');
const app = express();
const port = 8000;

app.use(express.static('./frontend'));

app.listen(port, () => {
  console.log('Example app listending on port ${port}')

})
