var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('category/index',{title:'Danh sách gian hàng'})
});

router.get('/create', function(req, res, next) {
  res.render('category/new',{title:'Thêm gian hàng'})
});

router.get('/edit', function(req, res, next) {
  res.render('category/edit',{title:'Sửa giang hàng'})
});

module.exports = router;
