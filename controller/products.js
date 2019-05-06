var express = require('express');
var con = require('./../config/key');
var router = express.Router();
var categories = [
  { id: '1', name: 'Giày', description: 'Giày tốt', status: '1' },
  { id: '2', name: 'Dép', description: 'Hàng tốt', status: '1' },
  { id: '3', name: 'Trang sức', description: 'Hàng đẹp', status: '0' },
]

var data = [
  { id: '1', name: 'Giày da', description: 'Giày tốt', categoryId: '1', status: '1' },
  { id: '2', name: 'Dép da', description: 'Hàng tốt', categoryId: '2',status: '1' },
  { id: '3', name: 'Trang sức da', description: 'Hàng đẹp', categoryId: '2',status: '0' },
]

var product = function(id, name,price,quantity, description, categoryId, status){
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.description = description;
  this.categoryId = categoryId;
  this.status = status;
}

var productsAll = [];
con.query('select * from products', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category, element.status);
    productsAll.push(x);
  })
});
var category = function(id, name, status, description){
  this.id = id;
  this.name = name;
  this.status = status;
  this.description = description;
}

var categoriesAll = [];

con.query('select * from categories', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new category(element.id, element.name, element.status, element.description);
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

router.create = (req,res,next)=>{
  let name = req.body.name;
  let categoryId = req.body.categoryId;
  let id = req.body.id;
  let price =req.body.price;
  let quantity = req.body.quantity;

  let status = 1;
  if(id==""){
    id=0;
  }
  let description = req.body.description;
  console.log(id);
  console.log(name);
  if(id == 0){
    
    let sql='INSERT INTO products(id_category,name,price,quantity,detail,status) VALUES ('+categoryId+',"'+name+'",'+price+','+quantity+',"'+description+'",'+status+')';
    con.query(sql);
  }
  else{
    let sql = 'UPDATE products SET name="'+name+'",id_category= '+categoryId+' ,price='+price+', status= '+status+' ,quantity= '+quantity+' ,detail= "'+description+'" WHERE id='+id;
    con.query(sql)
  }
  productsAll = [];
con.query('select * from products', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category, element.status);
    productsAll.push(x);
  })
});
  res.redirect('/san-pham');
}

router.changeStatus = (req, res, next) => {
  let id= req.params.id;
  let x, r;
  let sqlselect = "select * from products where id="+id;
  con.query(sqlselect, function(err, results, fields){
    x = results[0].status;
    if(x == 1){
      r = 0;
    }
    else{
      r = 1;
    }
    let sql = 'UPDATE products SET status='+r+' WHERE id='+id;
    con.query(sql);
    productsAll = [];
  con.query('select * from products', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new product(element.id, element.name,element.price,element.quantity,  element.detail,element.id_category, element.status);
      productsAll.push(x);
    })
  });
    
  });
  
  res.redirect('/san-pham');
  
  
}

router.get('/create', function(req, res, next) {
  res.render('product/new',{title:'Thêm sản phẩm'})
});

router.get('/edit', function(req, res, next) {
  res.render('product/edit',{title:'Sửa sản phẩm'})
});

module.exports = router;
