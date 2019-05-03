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


router.get('/gian-hang', category.list);
router.get('/nhan-vien', employee.list);
router.post('/nhan-vien', employee.listp);
router.post('/nhan-vien/change-status', employee.changeStatus);
router.post('/nhan-vien/taomoi', employee.create);
router.get('/khach-hang', customer.list);
router.get('/san-pham', product.list);
router.get('/don-hang', order.list);
router.get('/thong-ke-bao-cao/ngay', report.day);
router.get('/thong-ke-bao-cao/tuan', report.week);
router.get('/thong-ke-bao-cao/thang', report.month);
router.get('/thong-ke-bao-cao/quy', report.quarter);
router.get('/thong-ke-bao-cao/nam', report.year);
router.get('/tops/san-pham', top.product);
router.get('/tops/gian-hang', top.category);
router.get('/', index.home);
module.exports = router;
