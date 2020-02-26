var express = require('express');
var router = express.Router();
var game = require('../utils/index');

const isObject = obj => obj && obj.constructor && obj.constructor === Object;
const merge = (a, b) => {
  for (var attr in b) {
    if (isObject(a[attr]) && isObject(b[attr])) {
      merge(a[attr], b[attr]);
    } else {
      a[attr] = b[attr];
    }
  }
  return a
}
const clone = (a) => {
  return merge({}, a);
}
var Game = new game();

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/action', function (req, res) {
  if (!req.session.sekiro) {
    res.end("Session required.")
  }
  if (!req.session.sekiro.alive) {
    res.end("You dead.")
  }
  var body = JSON.parse(JSON.stringify(req.body));
  var copybody = clone(body)
  if (copybody.solution) {
    req.session.sekiro = Game.dealWithAttacks(req.session.sekiro, copybody.solution)
  }
  res.end("提交成功")
})

router.get('/attack', function (req, res) {
  if (!req.session.sekiro) {
    res.end("Session required.")
  }
  if (!req.session.sekiro.alive) {
    res.end("You dead.")
  }
  req.session.sekiro.attackInfo = Game.getAttackInfo()
  res.end(req.session.sekiro.attackInfo.method)
})

router.get('/info', function (req, res) {
  if (typeof(req.query.restart) != "undefined" || !req.session.sekiro) {
    req.session.sekiro = { "health": 3000, posture: 0, alive: true }
  }
  res.json(req.session.sekiro);
})

module.exports = router;
