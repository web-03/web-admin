var express = require('express');
var con = require('./../config/key');
const customer = require('./../model/customer');
var router = express.Router();

var customersAll = [];



/* GET home page. */
router.list = (req, res, next) => {
 
  customersAll = [];
  con.query('select * from customers', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new customer(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
      customersAll.push(x);
    })
    res.render('customer/index',{customers : customersAll})
  });
  
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
    res.redirect('/khach-hang');
  });
}


module.exports = router;
