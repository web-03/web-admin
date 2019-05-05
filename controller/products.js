var express = require('express');
var con = require('./../config/key');
var router = express.Router();
var categories = [
  { id: '1', name: 'Giày', description: 'Giày tốt', status: '1' },
  { id: '2', name: 'Dép', description: 'Hàng tốt', status: '1' },
  { id: '3', name: 'Trang sức', description: 'Hàng đẹp', status: '0' },
]

var data = [
  { id: '1', name: 'Giày', description: 'Giày tốt', categoryId: '1', status: '1' },
  { id: '2', name: 'Dép', description: 'Hàng tốt', categoryId: '2',status: '1' },
  { id: '3', name: 'Trang sức', description: 'Hàng đẹp', categoryId: '2',status: '0' },
]

var product = function(id, name, description, categoryId, status){
  this.id = id;
  this.name = name;
  this.categoryId = categoryId;
  this.description = description;
  this.status = status;
}
var categorie = function(id, name, description, status){
  this.id = id;
  this.name = name;
  this.description = description;
  this.status = status;
}
var productsAll = [];
con.query('select * from products', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new product(element.id, element.name, element.categoryId, element.description, element.status);
    productsAll.push(x);
  })
});
var categoriesAll = [];
con.query('select * from categories', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new categorie(element.id, element.name, element.description, element.status);
    categoriesAll.push(x);
  })
});
/* GET home page. */
router.list = (req, res, next) => {
  res.render('product/index',{products: productsAll, categories: categoriesAll})
};

router.post('/', function(req, res, next) {
  let name = req.body.name;
  let status = req.body.status;
  let products=[];
  if(status!= "-1" || name != ""){
    data.forEach(function(item){
      if((item.status == status || status=="-1") && (item.name == name || name=="")){
        products.push(item);
      }
    });
  }
  else{
    products = data;
  }
  res.render('product/index',{products: products, categories: categories})
});

router.get('/create', function(req, res, next) {
  res.render('product/new',{title:'Thêm sản phẩm'})
});

router.get('/edit', function(req, res, next) {
  res.render('product/edit',{title:'Sửa sản phẩm'})
});

module.exports = router;
