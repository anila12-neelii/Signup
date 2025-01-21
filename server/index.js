const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

const userRoutes = require('./Routes/userRoutes');
const blogRoutes = require('./Routes/blogRoutes');
// app.use(express.urlencoded({extended:false}));

dotenv.config();
require('./db/db');
const PORT = process.env.PORT || 4000;

//Midlware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

//listen
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})