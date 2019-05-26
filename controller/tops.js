var express = require('express');
var router = express.Router();

/* GET home page. */
router.product = (req, res, next) => {
  res.render('top/product',{title:'Top 10 sản phẩm',user: req.user})
};

router.category = (req, res, next) => {
  res.render('top/category',{title:'Top 10 gian hàng',user: req.user})
};

module.exports = router;
