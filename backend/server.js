const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const dbConfig = require('./config/dbConfig');
const Routes = require('./routes/routes');

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/api", Routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
