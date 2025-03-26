const express = require("express");
const dotenv = require("dotenv")
const {chats} = require("./data/data.js");
const userRoutes = require("./routes/userRoutes.js")
const chatRoutes = require("./routes/chatRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")
const connectDB = require("./config/db.js");
const { notFound, errorHandler } = require("./middlerware/errorMiddleware.js");

dotenv.config({
    path: "./env"
});

const app = express();
connectDB();
app.use(express.json());


app.get('/', (req, res)=>{
    res.send("API is also running")
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 6000;
// const PORT = 5000

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`))

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors:{
        origin: "http://localhost:3000",
    }
})

io.on("connection", (socket) => {
    console.log("connect to socket.io");

    socket.on('setup', (userData) =>{
        socket.join(userData._id)
        socket.emit('connected')
    });

    socket.on('join chat', (room)=>{
        socket.join(room);
        console.log("User Joinded Room: "+ room)
    })

    socket.on('typing', (room) => socket.in(room).emit("typing"));
    socket.on('stop typing', (room)=> socket.in(room).emit("stop typing"));

    socket.on('new message', (newmessageRecived) => {
        var chat = newmessageRecived.chat;

        if(!chat.users) return console.log("chat.users not defined")

        chat.users.forEach((user) =>{
            if(user._id == newmessageRecived.sender._id) return;

            socket.in(user._id).emit("message recived", newmessageRecived);
        })
    })

    socket.off("setup", ()=>{
        console.log("User Disconnected");
        socket.leave(userData._id)
    })
})