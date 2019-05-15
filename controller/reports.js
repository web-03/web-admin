var express = require('express');
var con = require('./../config/key');
var router = express.Router();

var reportDay = function(create, total){
  this.create = create;
  this.total = total;
}
var reportWeek = function(create, total){
  this.create = create;
  this.total = total;
}
var reportMonth = function(create, total){
  this.create = create;
  this.total = total;
}
var reportQuarter = function(create, total){
  this.create = create;
  this.total = total;
}
var reportYear = function(create, total){
  this.create = create;
  this.total = total;
}


/* GET home page. */
router.day = (req, res, next) => {
  let a = new Date();
  let fromDay = (1900+a.getYear())+'-'+a.getMonth() +'-'+a.getUTCDate();
  let toDay = (1900+a.getYear())+'-'+a.getMonth() +'-'+a.getDate();
  
  let reportDays = [];
  let totalAmount=0;
  con.query('SELECT DATE(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE Date(created_at) BETWEEN "2019-05-06" AND "2019-05-08" GROUP BY DATE(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.orderDay.getDate()+'-'+(element.orderDay.getMonth()+1)+'-'+(1900+element.orderDay.getYear()), element.total);
      reportDays.push(x);
      totalAmount += x.total;
    });
    res.render('report/day',{reportDays: reportDays, totalAmount:totalAmount});
  });
};

router.week = (req, res, next) => {
  res.render('report/week',{title:'Doanh thu theo tuần'})
};

router.month = (req, res, next) => {
  let a = new Date();
  let fromDay = (1900+a.getYear())+'-'+a.getMonth() +'-'+a.getUTCDate();
  let toDay = (1900+a.getYear())+'-'+a.getMonth() +'-'+a.getDate();
  console.log(fromDay);
  console.log(toDay);
  let reportDays = [];
  let totalAmount=0;
  con.query('SELECT DATE(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE Date(created_at) BETWEEN "2019-05-06" AND "2019-05-08" GROUP BY DATE(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.orderDay.getDate()+'-'+(element.orderDay.getMonth()+1)+'-'+(1900+element.orderDay.getYear()), element.total);
      reportDays.push(x);
      totalAmount += x.total;
    });
    res.render('report/month',{reportDays: reportDays, totalAmount:totalAmount});
  });
};

router.quarter = (req, res, next) => {
  res.render('report/quarter',{title:'Doanh thu theo quý'})
};

router.year = (req, res, next) => {
  res.render('report/year',{title:'Doanh thu theo năm'})
};

module.exports = router;
