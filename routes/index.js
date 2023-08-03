var express = require('express');
var router = express.Router();


let cards = [
  { title: 'Card title 1', text: 'This is a longer card with supporting text.', image: 'https://picsum.photos/1200/1200' },
  { title: 'Card title 2', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200' },
  { title: 'Card title 2', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200' },
  { title: 'Card title 2', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200' },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Sports Shop', authenticated: req.session.authenticated, cards: cards });
});

module.exports = router;
