const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./Config/database');
const cors = require("cors")
const registrationRoutes = require("./Routes/registrationRoutes")
const blogRoutes = require('./Routes/ChatRoutes');
const generatedRoutes = require("./Routes/GeneratedRoutespdf")
const  pettitionRoutes = require("./Routes/PettitionRoutes")
const messageRoutes = require("./Routes/MessageRoutes")
const socketHandler = require("./Utils/SocketHandler")
require('dotenv').config();

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

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
app.use('/api', messageRoutes);

// Socket.IO
socketHandler(io)


app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Server
const PORT = process.env.PORT || 5000// Connect to database
connectDB().then(()=>{
    console.log("Db connected sucessfully")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
