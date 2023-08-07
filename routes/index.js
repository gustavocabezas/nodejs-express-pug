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
  { title: 'Title 10', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=10' },
  { title: 'Title 11', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=11' },
  { title: 'Title 12', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=12' },
  { title: 'Title 13', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=13' },
  { title: 'Title 14', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=14' },
  { title: 'Title 15', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=15' },
  { title: 'Title 16', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=16' },
  { title: 'Title 17', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=17' },
  { title: 'Title 18', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=18' },
  { title: 'Title 19', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=19' },
  { title: 'Title 20', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=21' },
  { title: 'Title 21', text: 'This is a short card.', image: 'https://picsum.photos/1200/1200?random=22' },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  let authenticated = !!req.cookies.authenticationString;
  res.render('index', { title: 'Sports Shop', authenticated: authenticated, cards: cards });
});

module.exports = router;
