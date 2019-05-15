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
  con.query('SELECT HOUR(created_at) AS orderDay, SUM(sum_money) AS total FROM `orders` WHERE created_at BETWEEN "2019-05-06" AND "2019-05-08" GROUP BY HOUR(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.orderDay, element.total);
      reportDays.push(x);
      totalAmount += x.total;
    });
    console.log(reportDays);
    res.render('report/day',{reportDays: reportDays, totalAmount:totalAmount});
  });
};

router.week = (req, res, next) => {
  let reportDays = [];
  let totalAmount=0;
  con.query('SELECT WEEKDAY(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE created_at BETWEEN "2019-05-06" AND "2019-05-08" GROUP BY WEEKDAY(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      switch(element.orderDay){
        case 0:
          var x = new reportDay('Thứ 2', element.total);
          reportDays.push(x);
          totalAmount += x.total;
          break;
        case 1:
          var x = new reportDay('Thứ 3', element.total);
          reportDays.push(x);
          totalAmount += x.total;
          break;
        case 2:
          var x = new reportDay('Thứ 4', element.total);
          reportDays.push(x);
          totalAmount += x.total;
          break;
        case 3:
          var x = new reportDay('Thứ 5', element.total);
          reportDays.push(x);
          totalAmount += x.total;
          break;
        case 4:
          var x = new reportDay('Thứ 6', element.total);
          reportDays.push(x);
          totalAmount += x.total;
          break;
        case 5:
          var x = new reportDay('Thứ 7', element.total);
          reportDays.push(x);
          totalAmount += x.total;
          break;
        case 6:
          var x = new reportDay('Chủ nhật', element.total);
          reportDays.push(x);
          totalAmount += x.total;
          break;
        default:
          break;
      }
    });
    console.log(reportDays);
    res.render('report/week',{reportDays: reportDays, totalAmount:totalAmount});
  });
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
  let a = new Date();
  let fromDay = (1900+a.getYear())+'-'+a.getMonth() +'-'+a.getUTCDate();
  let toDay = (1900+a.getYear())+'-'+a.getMonth() +'-'+a.getDate();
  console.log(fromDay);
  console.log(toDay);
  let reportDays = [];
  let totalAmount=0;
  con.query('SELECT MONTH(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE YEAR(created_at)="'+(1900+a.getYear())+'"  GROUP BY MONTH(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(('Tháng ' + element.orderDay), element.total);
      reportDays.push(x);
      totalAmount += x.total;
    });
    res.render('report/quarter',{reportDays: reportDays, totalAmount:totalAmount});
  });
};

router.year = (req, res, next) => {
  let a = new Date();
  let fromDay = (1900+a.getYear())+'-'+a.getMonth() +'-'+a.getUTCDate();
  let toDay = (1900+a.getYear())+'-'+a.getMonth() +'-'+a.getDate();
  console.log(fromDay);
  console.log(toDay);
  let reportDays = [];
  let totalAmount=0;
  con.query('SELECT MONTH(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE YEAR(created_at)="'+(1900+a.getYear())+'"  GROUP BY MONTH(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(('Tháng ' + element.orderDay), element.total);
      reportDays.push(x);
      totalAmount += x.total;
    });
    res.render('report/year',{reportDays: reportDays, totalAmount:totalAmount});
  });
};

module.exports = router;
