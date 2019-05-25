var express = require('express');
var router = express.Router();

/* GET home page. */
router.home = (req, res, next) => {
  res.render('index', { title: 'Quản lí bán hàng' });
};
router.login = (req, res, next) => {
  res.render('login/login', { title: 'Đăng nhập' });
};


module.exports = router;
