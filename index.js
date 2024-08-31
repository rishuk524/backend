const express = require('express') ;
const bodyParser = require('body-parser')
 const http = require('http');
 const socketIo = require('socket.io');
const connectDB = require('./Config/database');
const cors = require("cors")
const registrationRoutes = require("./Routes/registrationRoutes")
const blogRoutes = require('./Routes/ChatRoutes');
const generatedRoutes = require("./Routes/GeneratedRoutespdf")
const  pettitionRoutes = require("./Routes/PettitionRoutes")
const NoticeRoutes = require("./Routes/NoticeRoutes")
const messageRoutes = require("./Routes/MessageRoutes")
 const userRoutes = require('./Routes/UserRoutes')
 const {initializeSocket,getSocketInstance} = require("./Utils/SocketHandler")
 const notifficationRoutes = require("./Routes/NotificationRoutes")
require('dotenv').config();
// const socketHandlerChatBot= require("./Utils/SocketHandlerChatbot")

 const app = express();

 const server = http.createServer(app);
  // const io = socketIo(server);
initializeSocket(server);
getSocketInstance(server);


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
app.use('/api',NoticeRoutes)
app.use('/api',userRoutes)

// Socket.IO
// socketHandler(io)


app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Server
const PORT = process.env.PORT || 5000// Connect to database
connectDB().then(()=>{
    console.log("Db connected sucessfully")
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

// http.listen(3000, function(){
// 	console.log('Listening to port 3000');
// })