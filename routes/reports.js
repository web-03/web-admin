var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/revenue-day', function(req, res, next) {
  res.render('report/day',{title:'Doanh thu theo ngày'})
});

router.get('/revenue-week', function(req, res, next) {
  res.render('report/week',{title:'Doanh thu theo tuần'})
});

router.get('/revenue-month', function(req, res, next) {
  res.render('report/month',{title:'Doanh thu theo tháng'})
});

router.get('/revenue-quarter', function(req, res, next) {
  res.render('report/quarter',{title:'Doanh thu theo quý'})
});

router.get('/revenue-year', function(req, res, next) {
  res.render('report/year',{title:'Doanh thu theo năm'})
});

module.exports = router;
