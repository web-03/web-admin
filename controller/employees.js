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
  let employees =[];
  employees = employeesAll;
  res.render('employee/index',{employees : employees});
};

router.listp = (req, res, next) => {
  let name = req.body.name;
  let status = req.body.status;
  let employees =[];
  if(status!= "-1" || name != ""){
    employeesAll.forEach(function(item){
      if((item.status == status || status=="-1") && (item.name == name || name=="")){
        employees.push(item);
      }
    });
  }
  else{
    employees = employeesAll;
  }
  res.render('employee/index',{employees : employees})
};

router.changeStatus = (req, res, id, next) => {
  
  let employee;
  console.log(id);
  if(id > 0){
    employeesAll.forEach(function(item){
      if(item.id == id){
        employees.push(item);
      }
    });
  }
  else{
    employees = employeesAll;
  }
  res.render('employee/index',{employees : employees})
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
  console.log(id);
  console.log(name);
  if(id == 0){
    let sql='INSERT INTO employees(name,account,phoneNumber,place, status) VALUES ("'+name+'",'+'"'+"aA"+'",'+'"'+phoneNumber+'",'+'"'+place+'",'+status+')';
    con.query(sql);
  }
  else{
    let sql = 'UPDATE employees SET name="'+name+'",account="'+"Ae"+'",phoneNumber="'+phoneNumber+'",place="'+place+'", status='+status+' WHERE id='+id;
    con.query(sql)
  }
  employeesAll = [];
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
      employeesAll.push(x);
    })
  });
  res.redirect('/nhan-vien');
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
