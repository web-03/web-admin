var express = require('express');
var router = express.Router();
var data = [
  { id: '1', name: 'Giày', description: 'Giày tốt', status: '1' },
  { id: '2', name: 'Dép', description: 'Hàng tốt', status: '1' },
  { id: '3', name: 'Trang sức', description: 'Hàng đẹp', status: '0' },
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('category/index', { categories: data });
});

router.post('/', function(req, res, next) {
  let name = req.body.name;
  let status = req.body.status;
  let categories=[];
  if(status!= "-1" || name != ""){
    data.forEach(function(item){
      if((item.status == status || status=="-1") && (item.name == name || name=="")){
        categories.push(item);
      }
    });
  }
  else{
    categories = data;
  }
  res.render('category/index',{categories : categories})
});

router.get('/create', function (req, res, next) {
  res.render('category/new', { title: 'Thêm gian hàng' })
});

router.get('/edit', function (req, res, next) {
  res.render('category/edit', { title: 'Sửa giang hàng' })
});

module.exports = router;
