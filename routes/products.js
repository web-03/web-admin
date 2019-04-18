var express = require('express');
var router = express.Router();
var categories = [
  { id: '1', name: 'Giày', description: 'Giày tốt', status: '1' },
  { id: '2', name: 'Dép', description: 'Hàng tốt', status: '1' },
  { id: '3', name: 'Trang sức', description: 'Hàng đẹp', status: '0' },
]

var data = [
  { id: '1', name: 'Giày', description: 'Giày tốt', categoryId: '1', status: '1' },
  { id: '2', name: 'Dép', description: 'Hàng tốt', categoryId: '2',status: '1' },
  { id: '3', name: 'Trang sức', description: 'Hàng đẹp', categoryId: '2',status: '0' },
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('product/index',{products: data, categories: categories})
});

router.get('/create', function(req, res, next) {
  res.render('product/new',{title:'Thêm sản phẩm'})
});

router.get('/edit', function(req, res, next) {
  res.render('product/edit',{title:'Sửa sản phẩm'})
});

module.exports = router;
