var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('order/index',{title:'Danh sách đơn hàng'})
});

router.get('/completed', function(req, res, next) {
  res.render('order/completed',{title:'Đơn hàng đã giao'})
});

router.get('/delivering', function(req, res, next) {
  res.render('order/delivering',{title:'Đơn hàng đang giao'})
});

router.get('/watting', function(req, res, next) {
  res.render('order/new',{title:'Đơn hàng chưa giao'})
});

module.exports = router;
