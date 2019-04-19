var express = require('express');
var router = express.Router();
var data = [
  {id: '1', name: 'Khách 1', account:'KH001', phoneNumber:'0344179690', place:'Quảng Nam', status:'1'},
  {id: '2', name: 'Khách 2', account:'KH002', phoneNumber:'0344179691', place:'Đồng Nai', status:'1'},
  {id: '3', name: 'Khách 3', account:'KH003', phoneNumber:'0344179692', place:'Đồng Nai', status:'0'},
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customer/index',{customers : data})
});

router.get('/create', function(req, res, next) {
  res.render('customer/new',{title:'Thêm khách hàng'})
});

router.get('/edit', function(req, res, next) {
  res.render('customer/edit',{title:'Sửa khách hàng'})
});

module.exports = router;
