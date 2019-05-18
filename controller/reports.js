var express = require('express');
var con = require('./../config/key');
var router = express.Router();
const reportDay = require('./../model/report');

/* GET home page. */
router.day = (req, res, next) => {
  
  let to = req.query.from;
  console.log(to);
  let fromDay="";
  if(to == undefined){
    let a = new Date();
    fromDay = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    if(a.getMonth()<9){
      if(a.getDate()<10){
        to = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-0' + a.getDate();
      }
      else{
        to = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-' + a.getDate();
      }
    }
    else{
      to = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    }
  }
  else{
    let tday = new Date(to);
    fromDay = (1900 + tday.getYear()) + '-' + (tday.getMonth()+1) + '-' + tday.getUTCDate();
  }
  console.log(fromDay);
  let reportDays = [];
  let totalAmount = 0;
  con.query('SELECT HOUR(created_at) AS orderDay, SUM(sum_money) AS total FROM `orders` WHERE Date(created_at) ="'+fromDay+'" GROUP BY HOUR(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.orderDay, element.total);
      reportDays.push(x);
      totalAmount += x.total;
    });
    if(totalAmount == 0){
      var x = new reportDay(0, 0);
      reportDays.push(x);
    }
    console.log(reportDays);
    res.render('report/day', { reportDays: reportDays, totalAmount: totalAmount, to : to });
  });
};

router.week = (req, res, next) => {
  let reportDays = [];
  let totalAmount = 0;
  con.query('SELECT WEEKDAY(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE created_at BETWEEN "2019-05-06" AND "2019-05-08" GROUP BY WEEKDAY(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      switch (element.orderDay) {
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
    res.render('report/week', { reportDays: reportDays, totalAmount: totalAmount });
  });
};

router.month = (req, res, next) => {
  let a = new Date();
  let fromDay = (1900 + a.getYear()) + '-' + a.getMonth() + '-' + a.getUTCDate();
  let toDay = (1900 + a.getYear()) + '-' + a.getMonth() + '-' + a.getDate();
  console.log(fromDay);
  console.log(toDay);
  let reportDays = [];
  let totalAmount = 0;
  con.query('SELECT DATE(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE Date(created_at) BETWEEN "2019-05-06" AND "2019-05-08" GROUP BY DATE(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.orderDay.getDate() + '-' + (element.orderDay.getMonth() + 1) + '-' + (1900 + element.orderDay.getYear()), element.total);
      reportDays.push(x);
      totalAmount += x.total;
    });
    res.render('report/month', { reportDays: reportDays, totalAmount: totalAmount });
  });
};

router.quarter = (req, res, next) => {
  let year = req.query.year;
  if(year == undefined){
    let a = new Date();
    year = (1900 + a.getYear());
  }
  let reportQuarter1 = [], reportQuarter2 = [], reportQuarter3 = [], reportQuarter4 = [];
  let totalAmount1 = 0, totalAmount2 = 0, totalAmount3 = 0, totalAmount4 = 0;
  for (d = 0; d < 3; d++) {
    let r1 = new reportDay(('Tháng ' + (d + 1)), 0);
    let r2 = new reportDay(('Tháng ' + (d + 4)), 0);
    let r3 = new reportDay(('Tháng ' + (d + 7)), 0);
    let r4 = new reportDay(('Tháng ' + (d + 10)), 0);
    reportQuarter1.push(r1);
    reportQuarter2.push(r2);
    reportQuarter3.push(r3);
    reportQuarter4.push(r4);
  }
  
  con.query('SELECT MONTH(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE YEAR(created_at)="' + year + '"  GROUP BY MONTH(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      switch (element.orderDay) {
        case 1:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter1[0] = x;
          totalAmount1 += x.total;
          break;
        case 2:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter1[1] = x;
          totalAmount1 += x.total;
          break;
        case 3:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter1[2] = x;
          totalAmount1 += x.total;
          break;
        case 4:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter2[0] = x;
          totalAmount2 += x.total;
          break;
        case 5:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter2[1] = x;
          totalAmount2 += x.total;
          break;
        case 6:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter2[2] = x;
          totalAmount2 += x.total;
          break;
        case 7:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter3[9] = x;
          totalAmount3 += x.total;
          break;
        case 8:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter3[1] = x;
          totalAmount3 += x.total;
          break;
        case 9:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter3[2] = x;
          totalAmount3 += x.total;
          break;
        case 10:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter4[0] = x;
          totalAmount4 += x.total;
          break;
        case 11:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter4[1] = x;
          totalAmount4 += x.total;
          break;
        case 12:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportQuarter4[2] = x;
          totalAmount4 += x.total;
          break;
      }
    });
    res.render('report/quarter', { reportQuarter1: reportQuarter1, reportQuarter2: reportQuarter2, reportQuarter3: reportQuarter3, reportQuarter4: reportQuarter4, totalAmount1: totalAmount1, totalAmount2: totalAmount2, totalAmount3: totalAmount3, totalAmount4: totalAmount4, year:year });
  });
};

router.year = (req, res, next) => {
  let year = req.query.year;
  if(year == undefined){
    let a = new Date();
    year = (1900 + a.getYear());
  }
  let reportDays = [];
  for (d = 0; d < 12; d++) {
    let r = new reportDay(('Tháng ' + (d + 1)), 0);
    reportDays.push(r);
  }
  let totalAmount = 0;
  con.query('SELECT MONTH(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE YEAR(created_at)="' + year + '"  GROUP BY MONTH(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      switch (element.orderDay) {
        case 1:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[0] = x;
          totalAmount += x.total;
          break;
        case 2:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[1] = x;
          totalAmount += x.total;
          break;
        case 3:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[2] = x;
          totalAmount += x.total;
          break;
        case 4:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[3] = x;
          totalAmount += x.total;
          break;
        case 5:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[4] = x;
          totalAmount += x.total;
          break;
        case 6:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[5] = x;
          totalAmount += x.total;
          break;
        case 7:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[6] = x;
          totalAmount += x.total;
          break;
        case 8:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[7] = x;
          totalAmount += x.total;
          break;
        case 9:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[8] = x;
          totalAmount += x.total;
          break;
        case 10:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[9] = x;
          totalAmount += x.total;
          break;
        case 11:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[10] = x;
          totalAmount += x.total;
          break;
        case 12:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[11] = x;
          totalAmount += x.total;
          break;
      }
    });
    res.render('report/year', { reportDays: reportDays, totalAmount: totalAmount, year: year });
  });
};

module.exports = router;
