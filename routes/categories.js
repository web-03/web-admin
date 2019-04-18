var express = require('express');
var router = express.Router();
var data = [
  { id: '1', name: 'Giày', description: 'Giày tốt', status: '1' },
  { id: '2', name: 'Dép', description: 'Hàng tốt', status: '1' },
  { id: '3', name: 'Trang sức', description: 'Hàng đẹp', status: '0' },
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('category/index', { categories: data });
});

router.get('/create', function (req, res, next) {
  res.render('category/new', { title: 'Thêm gian hàng' })
});

router.get('/edit', function (req, res, next) {
  res.render('category/edit', { title: 'Sửa giang hàng' })
});

module.exports = router;
