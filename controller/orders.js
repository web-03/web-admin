var express = require('express');
var con = require('./../config/key');
var router = express.Router();

var data = [
  { id: '1', productName: 'Giày', categoryName: 'Giày', quantity: '10', unitPrice : '100000', totalAmount:'1000000', status: '2' },
  { id: '2', productName: 'Dép', categoryName: 'Dép', quantity: '15', unitPrice : '20000', totalAmount:'300000', status: '1' },
  { id: '3', productName: 'Vòng tay', categoryName: 'Trang sức', quantity: '5', unitPrice : '50000', totalAmount:'250000', status: '0' },
]

var order = function(id, address , customerName, orderName, sumMoney, status){
  this.id = id;
  this.address = address;
  this.customerName = customerName;
  this.orderName = orderName;
  this.sumMoney = sumMoney;
  this.status = status;
}
var ordersAll = [];
con.query('select * from orders', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new order(element.id, element.address, element.customer_name, element.order_name, element.sum_money, element.status);
    ordersAll.push(x);
  })
});
/* GET home page. */
router.list = (req, res, next) => {
  res.render('order/index',{orders :  ordersAll})
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
    
    let sql = 'UPDATE orders SET status='+r+' WHERE id='+id;
    con.query(sql);
    ordersAll = [];
    con.query('select * from orders', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new order(element.id, element.address, element.customer_name, element.order_name, element.sum_money, element.status);
        ordersAll.push(x);
      })
    });
    
  });
  
  res.redirect('/don-hang');
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
