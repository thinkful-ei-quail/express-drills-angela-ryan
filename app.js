/* eslint-disable indent */
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// DRILL 01
// Do addition with queries
app.get('/sum', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const sum = a + b;

  if (!a || !b) {
    return res.status(400).send('Please enter two numbers for a + b');
  }

  const sumText = `${a} + ${b} = ${sum}`;

  res.send(sumText);
});

// DRILL 02
// caesar cipher
app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  // validation:
  if (!text) {
    return res.status(400).send('text is required');
  }
  if (!shift) {
    return res.status(400).send('shift is required');
  }

  const numberShift = parseInt(shift);

  if (Number.isNaN(numberShift)) {
    return res.status(400).send('shift must be a number');
  }
  const base = 'A'.charCodeAt(0);

  const cipher = text
    .toUpperCase()
    .split('')
    .map((character) => {
      const characterCode = character.charCodeAt(0);

      if (characterCode < base || characterCode > base + 26) {
        return character;
      }

      let difference = characterCode - base;
      difference = difference + numberShift;
      difference = difference % 26;

      const shiftedCharacter = String.fromCharCode(base + difference);
      return shiftedCharacter;
    })
    .join('');

  res.status(200).send(cipher);
});

// DRILL 03
// Lotto
app.get('/lotto', (req, res) => {
  const { numbers } = req.query;

  // validation:
  // 1. the numbers array must exist
  // 2. must be an array
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20

  if (!numbers) {
    return res.status(400).send('numbers is required');
  }

  if (!Array.isArray(numbers)) {
    return res.status(400).send('numbers must be an array');
  }

  const guesses = numbers
    .map((n) => parseInt(n))
    .filter((n) => !Number.isNaN(n) && n >= 1 && n <= 20);

  if (guesses.length != 6) {
    return res
      .status(400)
      .send('numbers must contain 6 integers between 1 and 20');
  }

  // fully validated numbers

  // here are the 20 numbers to choose from
  const stockNumbers = Array(20)
    .fill(1)
    .map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for (let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter((n) => !guesses.includes(n));

  // construct a response
  let responseText;

  switch (diff.length) {
    case 0:
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';
  }

  // uncomment below to see how the results ran

  // res.json({
  //   guesses,
  //   winningNumbers,
  //   diff,
  //   responseText
  // });

  res.send(responseText);
});

app.listen(8008, () => {
  console.log('Express server is listening on port 8008');
});
