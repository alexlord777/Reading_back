const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    rounds: [
        {
            letter: String,
            categories: [{ type: String }],
            answers: [{ player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, answer: String }]
        }
    ],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    scores: [{ player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, score: Number }],
    date: { type: Date, default: Date.now },
    accessKey: { type: String, required: true, unique: true },
    categories: [{ type: String }] // Añadir las categorías al esquema
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
