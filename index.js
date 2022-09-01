// Import required modules
const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const authRoutes = require('./routes/route.authentication')
//Define port on which our server will listen
const PORT = process.env.port || process.env.API_PORT

//Define middleware
const app = express()
app.use(express.json())
app.use(cors())

app.use('/auth/', authRoutes)


//create express server
const server = http.createServer(app)

//Connect MongoDB and Run the server on successful connection
mongoose.connect(process.env.DATABASE_URI)
    .then(() => server.listen(PORT, () => console.log('Server listening on port ' + PORT + '\nDatabase connection established. . ')))
    .catch(error => console.log('Error connecting to Database: ' + error + '\nServer failed to start'))