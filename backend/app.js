const api = require('./routes/api');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;

app.use("/api", api);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
