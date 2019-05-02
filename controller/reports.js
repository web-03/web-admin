var express = require('express');
var router = express.Router();

/* GET home page. */
router.day = (req, res, next) => {
  res.render('report/day',{title:'Doanh thu theo ngày'})
};

router.week = (req, res, next) => {
  res.render('report/week',{title:'Doanh thu theo tuần'})
};

router.month = (req, res, next) => {
  res.render('report/month',{title:'Doanh thu theo tháng'})
};

router.quarter = (req, res, next) => {
  res.render('report/quarter',{title:'Doanh thu theo quý'})
};

router.year = (req, res, next) => {
  res.render('report/year',{title:'Doanh thu theo năm'})
};

module.exports = router;
