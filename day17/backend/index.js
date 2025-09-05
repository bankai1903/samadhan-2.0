const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // The origin of the React app
    methods: ["GET", "POST"],
  },
});

const users = {}; // A temporary store for users

// Listen for a client connection
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Handle user joining
  socket.on('join', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('message', {
      user: 'admin',
      text: `${username} has joined the chat.`,
    });
    console.log(`${username} joined.`);
  });

  // Handle sending a message
  socket.on('sendMessage', (message) => {
    const username = users[socket.id];
    if (username) {
      io.emit('message', { user: username, text: message });
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      socket.broadcast.emit('message', {
        user: 'admin',
        text: `${username} has left the chat.`,
      });
      delete users[socket.id];
      console.log(`${username} disconnected.`);
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
