var express = require('express');
var con = require('./../config/key');
var router = express.Router();

var reportDay = function(create, total){
  this.create = create;
  this.total;
}
var reportWeek = function(create, total){
  this.create = create;
  this.total;
}
var reportMonth = function(create, total){
  this.create = create;
  this.total;
}
var reportQuarter = function(create, total){
  this.create = create;
  this.total;
}
var reportYear = function(create, total){
  this.create = create;
  this.total;
}

con.query('SELECT created_at, SUM(sum_money) AS '+'total'+' FROM `orders` GROUP BY created_at HAVING created_at BETWEEN "'+'2019-05-06'+'" AND "'+'2019-05-07'+'"', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new reportDay(element.create, element.total);
  })
});

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
