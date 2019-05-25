var express = require('express');
var con = require('./../config/key');
const employee = require('./../model/employee');
var router = express.Router();

var employeesAll = [];

/* GET home page. */
router.list = (req, res, next) => {
  
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err
    employeesAll=[];
    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
      employeesAll.push(x);
    });
    res.render('employee/index',{employees : employeesAll});
  });
  
};

router.listp = (req, res, next) => {
  
};

router.changeStatus = (req, res, next) => {
  
  let id= req.params.id;
  let x, r;
  let sqlselect = "select * from employees where id="+id;
  con.query(sqlselect, function(err, results, fields){
    x = results[0].status;
    if(x == 1){
      r = 0;
    }
    else{
      r = 1;
    }
    let sql = 'UPDATE employees SET status='+r+' WHERE id='+id;
    con.query(sql);
    res.redirect('/nhan-vien');
    
  });
  
};


router.create = (req, res, next) => {
  let name = req.body.name;
  let status = 1;
  let id = req.body.id;
  if(id==""){
    id=0;
  }
  let phoneNumber = req.body.phoneNumber;
  let place = req.body.place;
  let password = req.body.password;
  console.log(id);
  console.log(name);
  console.log(password);
  if(id == 0){
    let sql='INSERT INTO employees(name,account,password,phoneNumber,place, status) VALUES ( "'+name+'" , '+ '"abc"' +' ,"'+password+ '", '+' "'+phoneNumber+'",'+'"'+place+'",'+status+')';
    console.log(sql);
    con.query(sql);
    let sqlFind = 'select * from employees where account = '+'"abc"';
    console.log(sqlFind);
    con.query(sqlFind, function(err, results, fields){
      x = results[0].id;
      let newAccount = 'NV'+x;
      console.log(newAccount);
      let sqlUpdate = 'UPDATE employees SET account="'+newAccount+'" WHERE id='+x;
      con.query(sqlUpdate);
      res.redirect('/nhan-vien');
    });
    
  }
  else{
    if(password == ""){
      let sql = 'UPDATE employees SET name="'+name+'",phoneNumber="'+phoneNumber+'",place="'+place+'", status='+status+' WHERE id='+id;
      con.query(sql);
      res.redirect('/nhan-vien');
    }
    else{
      let sql = 'UPDATE employees SET name="'+name+'",password="'+password+'",phoneNumber="'+phoneNumber+'",place="'+place+'", status='+status+' WHERE id='+id;
      con.query(sql);
      res.redirect('/nhan-vien');
    }
  }
  
  
};
router.changePassword = (req, res, next) => {
  let account = req.query.account;
  let sqlselect = "select * from employees where account="+account;
  con.query(sqlselect, function(err, results, fields){
    let x = results[0].account;
    res.render('employee/changePassword',{x : x});
    
  });
  
};
router.saveNewPassword = (req, res, next) => {
  let account = req.query.account;
  let password = req.query.account;
  let x, r;
  let sqlselect = "select * from employees where account="+account;
  con.query(sqlselect, function(err, results, fields){
    x = results[0].status;
    if(x == 1){
      r = 0;
    }
    else{
      r = 1;
    }
    let sql = 'UPDATE employees SET password="'+password+'" WHERE account="'+account+'"';
    con.query(sql);
    res.redirect('/nhan-vien/doi-mat-khau');
    
  });
  
};

module.exports = router;
