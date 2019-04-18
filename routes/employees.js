var express = require('express');
var router = express.Router();

var data = [
  {id: '1', name: 'Nguyễn Đức Trà', account:'NV001', phoneNumber:'0344179690', roleName:'Thu ngân',place:'Quảng Nam', status:'1'},
  {id: '2', name: 'Ngô Trần Nguyễn', account:'NV002', phoneNumber:'0344179691', roleName:'shipping',place:'Đồng Nai', status:'1'},
  {id: '3', name: 'Vũ Tuấn Toàn', account:'NV003', phoneNumber:'0344179692', roleName:'Tư vấn',place:'Đồng Nai', status:'0'},
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('employee/index',{employees : data});
});

router.get('/create', function(req, res, next) {
  res.render('employee/new',{title:'Thêm nhân viên'})
});

router.get('/edit', function(req, res, next) {
  res.render('employee/edit',{title:'Sửa nhân viên'})
});

module.exports = router;
