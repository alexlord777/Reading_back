const Game = require('../model/GAME');
const generateKey = require('../lib/game');
const word = require('../helpers/game');
const socketConfig = require('../lib/jwt')

const createGame = async (req, res) => {
  try {
    const { playerId } = req.body;
    const categories = ["Name", "Animal", "City", "Meal", "Color", "Profession"];

    const game = new Game({
      accessKey: generateKey(),
      players: [playerId],
      rounds: [],
      categories: categories // Añadir las categorías al juego
    });

    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Error creating game' });
  }
};

const getGame = async (req, res) => {
  const { accessKey } = req.body;

  try {
    const game = await Game.findOne({ accessKey });

    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const joinGame = async (req, res) => {
  const { accessKey, playerId } = req.body;

  try {
    const game = await Game.findOne({ accessKey });

    if (game) {
      game.players.push(playerId);
      await game.save();
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const startNewRound = async (req, res) => {
  console.log(req.body)
  try {
    const { accessKey } = req.body;
    const game = await Game.findById(accessKey);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const newLetter = word(); // Implementa una función para generar una letra que no haya salido en rondas anteriores
    const newRound = {
      roundNumber: game.currentRound,
      letter: newLetter,
      answers: {} // Puedes ajustar esta estructura según tus necesidades
    };

    game.rounds.push(newRound);
    game.currentRound += 1;

    await game.save();

    res.status(200).json(newRound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAnswers = async (req, res) => {
  const { accessKey, playerId, answers } = req.body;

  console.log(answers,"getanaswer")
  console.log(playerId,"getanaswer")
  try {
    const game = await Game.findOne({ accessKey });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const round = game.rounds[game.rounds.length - 1];
    const playerResponse = round.responses.find(response => response.player.equals(playerId));

    if (playerResponse) {
      playerResponse.answers = answers;
    } else {
      round.responses.push({
        player: playerId,
        answers: answers
      });
    }

    await game.save();
    res.status(200).json({ message: "Answers saved successfully" });

  } catch (error) {
    console.error("Error saving answers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const responseRaiting = async(req, res) => {
  const { accessKey } = req.body;

  
  try {
    const game = await Game.findOne({ accessKey })
    console.log(game.rounds.answers)
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    console.log("hola")
    const round = game.rounds[game.rounds.length - 1];
    const scores = {};

    game.players.forEach(playerId => {
      scores[playerId] = 0;
    });

    game.forEach(category => {
      const answersByCategory = round.responses.map(response => ({
        player: response.player._id.toString(),
        answer: response.answers.find(ans => ans.category === category)?.answer.trim().toLowerCase()
      }));

      const uniqueAnswers = newSet();

      answersByCategory.forEach(({ player, answer }) => {
        if (answer) {
          // 10 puntos por respuesta no vacía
          scores[player] += 10;

          // 5 puntos adicionales por respuesta única
          if (!uniqueAnswers.has(answer)) {
            scores[player] += 5;
            uniqueAnswers.add(answer);
          }
        }
      })
    })

    round.scores = game.players.map(playerId => ({
      player: playerId,
      score: scores[playerId]
    }));

    await game.save();

    

    res.status(200).json({ message: "Scores calculated successfully", scores: round.scores });

  } catch (error) {

  }
}



module.exports = { startGame: createGame, joinGame, getGame, startNewRound, getAnswers, responseRaiting};



