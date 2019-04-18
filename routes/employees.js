var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('employee/index',{title:'Danh sách nhân viên'})
});

router.get('/create', function(req, res, next) {
  res.render('employee/new',{title:'Thêm nhân viên'})
});

router.get('/edit', function(req, res, next) {
  res.render('employee/edit',{title:'Sửa nhân viên'})
});

module.exports = router;
