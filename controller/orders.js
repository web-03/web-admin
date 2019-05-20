var express = require('express');
var con = require('./../config/key');
const order = require('./../model/order');
var router = express.Router();

var ordersAll = [];

/* GET home page. */
router.list = (req, res, next) => {
  con.query('select * from orders', function (err, rows, fields) {
    if (err) throw err
    ordersAll = [];
    rows.forEach(element => {
      var x = new order(element.id, element.address, element.customer_name, element.order_name, element.sum_money, element.status);
      ordersAll.push(x);
    });
    res.render('order/index',{orders :  ordersAll});
  });
};
router.changeStatus = (req, res, next) => {
  let id= req.params.id;
  let x, r;
  let sqlselect = "select * from orders where id="+id;
  con.query(sqlselect, function(err, results, fields){
    x = results[0].status;
    if(x == 0){
      r = 1;
    }
    else if(x==1){
      r = 2;
    }
    res.redirect('/don-hang');
    
    
  });
  
 
}
router.get('/completed', function(req, res, next) {
  res.render('order/completed',{title:'Đơn hàng đã giao'})
});

router.get('/delivering', function(req, res, next) {
  res.render('order/delivering',{title:'Đơn hàng đang giao'})
});

router.get('/watting', function(req, res, next) {
  res.render('order/new',{title:'Đơn hàng chưa giao'})
});

module.exports = router;
