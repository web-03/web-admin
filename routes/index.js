var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quản lí bán hàng' });
});

router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // send a regular response
  res.send('regular')
  console.log(res.method)
})

// handler for the /user/:id path, which sends a special response
router.get('/user/:id', function (req, res, next) {
  res.send('special')
})

module.exports = router;
