var express = require('express');
var router = express.Router();


let cards = [
  { title: 'Title 1', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=1' },
  { title: 'Title 2', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=2' },
  { title: 'Title 3', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=3' },
  { title: 'Title 4', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=4' },
  { title: 'Title 5', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=5' },
  { title: 'Title 6', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=6' },
  { title: 'Title 7', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=7' },
  { title: 'Title 8', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=8' },
  { title: 'Title 9', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=9' },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  let authenticated = !!req.cookies.authenticationString;
  res.render('index', { title: 'Sports Shop', authenticated: authenticated, cards: cards });
});

module.exports = router;
