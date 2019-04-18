var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('product/index',{title:'Danh sách sản phẩm'})
});

router.get('/create', function(req, res, next) {
  res.render('product/new',{title:'Thêm sản phẩm'})
});

router.get('/edit', function(req, res, next) {
  res.render('product/edit',{title:'Sửa sản phẩm'})
});

module.exports = router;
