import { app, io, startServer } from './config/server.js';

(async () => {
  try {
    await startServer();
    console.log(`Servidor Socket.IO rodando na porta ${app.get('port')}`);
    console.log(`Servidor Express rodando na porta ${io.httpServer.address().port}`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
  }
})();