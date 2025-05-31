const express = require('express');
require('dotenv').config();
const path = require("path");
const cors = require('cors');
const useRouter = require('./router/Approuter');


// Initialize the Express application
const app = express();
// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS and specify the views directory
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

// Serve static files from the 'public' directory
app.use(express.static(path.resolve("./public")));

// Enable CORS for all origins and specific methods and headers
app.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Use the router from Approuter.js
app.use('/api', useRouter.router);




app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to the API',
        status: 'success',
        owner: 'Vikas singh',
    }).json().status(200);
});






app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error starting the server:', error);
    }
});
