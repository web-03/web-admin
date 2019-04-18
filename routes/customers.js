var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customer/index',{title:'Danh sách khách hàng'})
});

router.get('/create', function(req, res, next) {
  res.render('customer/new',{title:'Thêm khách hàng'})
});

router.get('/edit', function(req, res, next) {
  res.render('customer/edit',{title:'Sửa khách hàng'})
});

module.exports = router;
