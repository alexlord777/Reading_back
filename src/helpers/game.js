const usedLetters = new Set(); // Mantiene las letras ya usadas

function generateRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let letter;

    do {
        letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (usedLetters.has(letter));

    usedLetters.add(letter);
    return letter;
}

module.exports= generateRandomLetter;
