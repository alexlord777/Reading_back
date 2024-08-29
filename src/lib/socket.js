const socketIo = require('socket.io');
const Game = require('../model/GAME');

let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
    });

    // Objeto para almacenar los IDs de los sockets de los jugadores
    const playerSockets = {};

    io.on('connection', (socket) => {
      console.log('Nuevo cliente conectado', socket.id);

      socket.on('join_game', async ({ accessKey, playerId }) => {
        try {
          const game = await Game.findOne({ accessKey });
          if (game) {
            socket.join(accessKey);
            if (!game.players.includes(playerId)) {
              game.players.push(playerId);
              await game.save();
            }
            // Guardar el ID del socket del jugador
            playerSockets[playerId] = socket.id;

            const populatedGame = await Game.findOne({ accessKey }).populate('players', 'username');
            io.to(accessKey).emit('player_joined', populatedGame.players);
          } else {
            socket.emit('error', 'Game not found');
          }
        } catch (error) {
          console.error(error);
          socket.emit('error', 'Server error');
        }
      });

      socket.on('start_game', ({ gameId, players }) => {
        // Enviar un mensaje a cada jugador por separado

        console.log(playerSockets,'starGame')
        players.forEach(playerId => {
          const socketId = playerSockets[playerId];
          if (socketId) {
            io.to(socketId).emit('game_started', { gameId });
          }
        });
        console.log(playerSockets,'starGameQ')
      });

      socket.on('start_countdown', ({ gameId, players }) => {
        let countdownTime = 10; // 10 segundos para la cuenta regresiva

        console.log(playerSockets,'playesrs')
  
        const countdownInterval = setInterval(() => {
          if (countdownTime > 0) {
            players.forEach(playerId => {
              const socketId = playerSockets[playerId];
              if (socketId) {
                io.to(socketId).emit('countdown', countdownTime);
              }
            });
            countdownTime--;
          } else {
            clearInterval(countdownInterval);
            players.forEach(playerId => {
              const socketId = playerSockets[playerId];
              if (socketId) {
                io.to(socketId).emit('countdown_finished');
              }
            });
          }
        }, 1000);
      });

      socket.on('new_round', (round) => {
        // Enviar nueva ronda a todos los jugadores en la sala
        io.to(round.accessKey).emit('round_started', round);
      });

      socket.on('disable_finish_button', ({ players }) => {
        players.forEach(playerId => {
          const socketId = playerSockets[playerId];
          if (socketId) {
            io.to(socketId).emit('disable_finish_button');
          }
        });
    });

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        // Eliminar el ID del socket del jugador desconectado
        for (let playerId in playerSockets) {
          if (playerSockets[playerId] === socket.id) {
            delete playerSockets[playerId];
            break;
          }
        }
      });
    });
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  }
};
