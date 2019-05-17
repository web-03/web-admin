var express = require('express');
var router = express.Router();

/* GET home page. */
router.home = (req, res, next) => {
  res.render('index', { title: 'Quản lí bán hàng' });
};


module.exports = router;
