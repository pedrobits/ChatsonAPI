// server.js
import express from 'express';
import http from 'http';
import morgan from 'morgan'
import { Server as SocketIOServer } from 'socket.io';
import db from './db.js'
import routes from '../routes/index.js'
import events from '../events/index.js'

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

db.on("error", console.log.bind(console, "Erro de Conexão no MongoDB"));

db.once("open", async () => {
  console.log("Conexão com MongoDB feita com sucesso!");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor Express e Socket.IO rodando na porta ${PORT}`);
});

app.use(express.json())
app.use(morgan("tiny"));

routes(app)
events(io)

export { app, io };