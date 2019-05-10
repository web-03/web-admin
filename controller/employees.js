var express = require('express');
var con = require('./../config/key');
var router = express.Router();


var employee = function(id, name, account, phoneNumber, place, status){
  this.id = id;
  this.name = name;
  this.account = account;
  this.phoneNumber = phoneNumber;
  this.place = place;
  this.status = status;
}

var employeesAll = [];

con.query('select * from employees', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new employee(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
    employeesAll.push(x);
  })
});
/* GET home page. */
router.list = (req, res, next) => {
  
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err
    let employees =[];
    employeesAll=[];
    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
      employeesAll.push(x);
    });
    employees = employeesAll;
    res.render('employee/index',{employees : employees});
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
    employeesAll = [];
    con.query('select * from employees', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new employee(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
        employeesAll.push(x);
      })
    });
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
    });
    
  }
  else{
    if(password == ""){
      let sql = 'UPDATE employees SET name="'+name+'",phoneNumber="'+phoneNumber+'",place="'+place+'", status='+status+' WHERE id='+id;
      con.query(sql);
    }
    else{
      let sql = 'UPDATE employees SET name="'+name+'",password="'+password+'",phoneNumber="'+phoneNumber+'",place="'+place+'", status='+status+' WHERE id='+id;
      con.query(sql);
    }
  }
  employeesAll = [];
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
      employeesAll.push(x);
    });
    res.redirect('/nhan-vien');
  });
};

router.get('/doi-mat-khau', function(req, res, next) {
  res.render('employee/changePassword',{title:'Đổi mật khẩu'})
});

router.post('/doi-mat-khau', function(req, res, next) {
  res.render('index');
});

router.get('/create', function(req, res, next) {
  res.render('employee/new',{title:'Thêm nhân viên'})
});

router.get('/edit', function(req, res, next) {
  res.render('employee/edit',{title:'Sửa nhân viên'})
});

module.exports = router;
