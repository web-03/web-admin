var express = require('express');
var router = express.Router();
var category = require('../controller/categories');
var customer = require('../controller/customers');
var employee = require('../controller/employees');
var product = require('../controller/products');
var order = require('../controller/orders');
var report = require('../controller/reports');
var top = require('../controller/tops');
var index = require('../controller/index');


router.get('/gian-hang',isLoggedIn ,category.list);
router.get('/profile',isLoggedIn ,employee.profile);
router.get('/dang-nhap', index.login);
router.post('/login',index.postLogin);
router.get('/logout',index.logout);
router.post('/gian-hang/taomoi',isLoggedIn , category.create);
router.get('/gian-hang/chuyen-trang-thai/:id',isLoggedIn , category.changeStatus);
router.get('/nhan-vien',isLoggedIn , employee.list);
router.get('/nhan-vien/doi-mat-khau', isLoggedIn ,employee.changePassword);
router.post('/nhan-vien/doi-mat-khau',isLoggedIn , employee.saveNewPassword);
router.get('/nhan-vien/chuyen-trang-thai/:id',isLoggedIn , employee.changeStatus);
router.post('/nhan-vien/taomoi',isLoggedIn , employee.create);
router.get('/khach-hang',isLoggedIn , customer.list);
router.get('/khach-hang/chuyen-trang-thai/:id',isLoggedIn , customer.changeStatus);
router.get('/san-pham', isLoggedIn ,product.list);
router.post('/san-pham/taomoi',isLoggedIn , product.create);
router.get('/san-pham/chuyen-trang-thai/:id',isLoggedIn , product.changeStatus);
router.get('/don-hang',isLoggedIn , order.list);
router.get('/don-hang/chuyen-trang-thai/:id', isLoggedIn ,order.changeStatus);
router.get('/thong-ke-bao-cao/ngay', isLoggedIn ,report.day);
router.get('/thong-ke-bao-cao/tuan',isLoggedIn , report.week);
router.get('/thong-ke-bao-cao/thang',isLoggedIn , report.month);
router.get('/thong-ke-bao-cao/quy',isLoggedIn , report.quarter);
router.get('/thong-ke-bao-cao/nam',isLoggedIn , report.year);
router.get('/tops/top-san-pham-ngay',isLoggedIn , top.dayproducts);
router.get('/tops/top-san-pham-tuan',isLoggedIn , top.weekproducts);
router.get('/tops/top-san-pham-thang',isLoggedIn , top.monthproducts);
router.get('/tops/top-san-pham-quy',isLoggedIn , top.quaterproducts);
router.get('/tops/top-gian-hang-ngay',isLoggedIn , top.categorydays);
router.get('/tops/top-gian-hang-tuan',isLoggedIn , top.categoryweeks);
router.get('/', index.home);



function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;
