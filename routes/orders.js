var express = require('express');
var router = express.Router();

var data = [
  { id: '1', productName: 'Giày', categoryName: 'Giày', quantity: '10', unitPrice : '100000', totalAmount:'1000000', status: '2' },
  { id: '2', productName: 'Dép', categoryName: 'Dép', quantity: '15', unitPrice : '20000', totalAmount:'300000', status: '1' },
  { id: '3', productName: 'Vòng tay', categoryName: 'Trang sức', quantity: '5', unitPrice : '50000', totalAmount:'250000', status: '0' },
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('order/index',{orders :  data})
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
