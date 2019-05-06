var express = require('express');
var con = require('./../config/key');
var router = express.Router();
var data = [
  {id: '1', name: 'Khách 1', account:'KH001', phoneNumber:'0344179690', place:'Quảng Nam', status:'1'},
  {id: '2', name: 'Khách 2', account:'KH002', phoneNumber:'0344179691', place:'Đồng Nai', status:'1'},
  {id: '3', name: 'Khách 3', account:'KH003', phoneNumber:'0344179692', place:'Đồng Nai', status:'0'},
]


var customer = function(id, name, account, phoneNumber, place, status){
  this.id = id;
  this.name = name;
  this.account = account;
  this.phoneNumber = phoneNumber;
  this.place = place;
  this.status = status;
}

var customersAll = [];
con.query('select * from customers', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new customer(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
    customersAll.push(x);
  })
});


/* GET home page. */
router.list = (req, res, next) => {
 
  let name = req.name;
  let status = req.status;
  console.log(name);
  console.log(status);
  res.render('customer/index',{customers : customersAll})
};
router.changeStatus = (req, res, next) => {
  let id= req.params.id;
  let x, r;
  let sqlselect = "select * from customers where id="+id;
  con.query(sqlselect, function(err, results, fields){
    x = results[0].status;
    if(x == 1){
      r = 0;
    }
    else{
      r = 1;
    }
    let sql = 'UPDATE customers SET status='+r+' WHERE id='+id;
    con.query(sql);
    customersAll = [];
con.query('select * from customers', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new customer(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
    customersAll.push(x);
  })
});
    
  });
  
  res.redirect('/khach-hang');
}
router.post('/', function(req, res, next) {
  let name = req.body.name;
  let status = req.body.status;
  let customers=[];
  if(status!= "-1" || name != ""){
    data.forEach(function(item){
      if((item.status == status || status=="-1") && (item.name == name || name=="")){
        customers.push(item);
      }
    });
  }
  else{
    customers = data;
  }
  res.render('customer/index',{customers : customers})
});

router.get('/create', function(req, res, next) {
  res.render('customer/new',{title:'Thêm khách hàng'})
});

router.get('/edit', function(req, res, next) {
  res.render('customer/edit',{title:'Sửa khách hàng'})
});

module.exports = router;
