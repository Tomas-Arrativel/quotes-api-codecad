const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const quoteToSend = getRandomElement(quotes);
  res.send({ quote: quoteToSend });
});

app.get('/api/quotes', (req, res, next) => {
  if (req.query.person) {
    const person = req.query.person;
    const quotesToSend = quotes.filter((quote) =>
      quote.person.includes(person),
    );

    if (quotesToSend.length > 0) res.send({ quotes: quotesToSend });
    else res.send({ quotes: [] });
  } else {
    res.send({ quotes: quotes });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
