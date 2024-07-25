const express = require('express');
const bodyParser = require('body-parser')
const connectDB = require('./Config/database');
const cors = require("cors")
const registrationRoutes = require("./Routes/registrationRoutes")
const blogRoutes = require('./Routes/ChatRoutes');
const generatedRoutes = require("./Routes/GeneratedRoutespdf")
const  pettitionRoutes = require("./Routes/PettitionRoutes")
require('dotenv').config();

const app = express();


// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", registrationRoutes)
app.use('/api', blogRoutes);
app.use('/api', generatedRoutes)
app.use('/api', pettitionRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Server
const PORT = process.env.PORT || 5000// Connect to database
connectDB().then(()=>{
    console.log("Db connected sucessfully")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
