var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/products', function(req, res, next) {
  res.render('top/product',{title:'Top 10 sản phẩm'})
});

router.get('/categories', function(req, res, next) {
  res.render('top/category',{title:'Top 10 gian hàng'})
});

module.exports = router;
