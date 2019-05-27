var express = require('express');
var con = require('./../config/key');
const employee = require('./../model/employee');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();

var employeesAll = [];

/* GET home page. */
router.list = (req, res, next) => {

  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err
    employeesAll = [];
    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.account, element.phoneNumber, element.place, element.status);
      employeesAll.push(x);
    });
    res.render('employee/index', { employees: employeesAll, user: req.user });
  });

};

router.profile = (req, res, next) => {
  res.render('employee/profile', { user: req.user });
};

router.changeStatus = (req, res, next) => {
  let employeeIdCurrent = req.user.id;
  let id = req.params.id;
  if (employeeIdCurrent == id) {
    res.render('employee/change_status_fail', { employees: employeesAll, user: req.user });
  }
  else {
    let x, r;
    let sqlselect = "select * from employees where id=" + id;
    con.query(sqlselect, function (err, results, fields) {
      x = results[0].status;
      if (x == 1) {
        r = 0;
      }
      else {
        r = 1;
      }
      let sql = 'UPDATE employees SET status=' + r + ' WHERE id=' + id;
      con.query(sql);
      res.redirect('/nhan-vien');

    });
  }
};


router.create = (req, res, next) => {
  let name = req.body.name;
  let status = 1;
  let id = req.body.id;
  if (id == "") {
    id = 0;
  }
  let phoneNumber = req.body.phoneNumber;
  let place = req.body.place;
  let password = bcrypt.hashSync(req.body.password, null, null);
  console.log(id);
  console.log(name);
  console.log(password);
  if (id == 0) {
    let sql = 'INSERT INTO employees(name,account,password,phoneNumber,place, status) VALUES ( "' + name + '" , ' + '"abc"' + ' ,"' + password + '", ' + ' "' + phoneNumber + '",' + '"' + place + '",' + status + ')';
    console.log(sql);
    con.query(sql);
    let sqlFind = 'select * from employees where account = ' + '"abc"';
    console.log(sqlFind);
    con.query(sqlFind, function (err, results, fields) {
      x = results[0].id;
      let newAccount = 'NV' + x;
      console.log(newAccount);
      let sqlUpdate = 'UPDATE employees SET account="' + newAccount + '" WHERE id=' + x;
      con.query(sqlUpdate);
      res.redirect('/nhan-vien');
    });

  }
  else {
    if (password == "") {
      let sql = 'UPDATE employees SET name="' + name + '",phoneNumber="' + phoneNumber + '",place="' + place + '", status=' + status + ' WHERE id=' + id;
      con.query(sql);
      res.redirect('/nhan-vien');
    }
    else {
      let sql = 'UPDATE employees SET name="' + name + '",password="' + password + '",phoneNumber="' + phoneNumber + '",place="' + place + '", status=' + status + ' WHERE id=' + id;
      con.query(sql);
      res.redirect('/nhan-vien');
    }
  }


};
router.changePassword = (req, res, next) => {

  res.render('employee/changePassword', { msg: "", user: req.user });

};
router.saveNewPassword = (req, res, next) => {
  let account = req.user.account;
  // let oldPassword = bcrypt.hashSync(req.body.oldPassword, null, null);
  let oldPassword = req.body.oldPassword;
  let password = bcrypt.hashSync(req.body.newPassword, null, null);
  console.log("oldpass: " + oldPassword);
  let x, r;
  let sqlselect = 'select * from employees where account="' + account + '"';
  con.query(sqlselect, function (err, results, fields) {
    x = results[0].password;
    console.log(x);
    if (bcrypt.compareSync(oldPassword, x)) {
      let sql = 'UPDATE employees SET password="' + password + '" WHERE account="' + account + '"';
      con.query(sql, function (err, results, fields) { });

      res.render('employee/changePassword', { user: req.user, msg: "Đổi mật khẩu thành công!" });
    }
    else {
      res.render('employee/changePassword', { user: req.user, msg: "Mật khẩu cũ không chính xác!" });
    }
  });

};

module.exports = router;
