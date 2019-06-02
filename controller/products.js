var express = require('express');
var con = require('./../config/key');
const multer = require('multer');
const path = require('path');
const product = require('./../model/product');
const category = require('./../model/category');
var router = express.Router();
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
var productsAll = [];

/* GET home page. */
router.list = (req, res, next) => {
  
  con.query('select *, c.name as cateName from products p, categories c WHERE p.id_category = c.id', function (err, rows, fields) {
    if (err) throw err
    productsAll=[];
    rows.forEach(element => {
      var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.image,element.cateName, element.status);
      productsAll.push(x);
    })
    res.render('product/index',{products: productsAll,user: req.user})
  });
};


router.create = (req,res,next)=>{
  upload(req, res, (err) => {
    if(err){
      console.log(err);
    } else {
      let file = req.file;
      let fileName="";
      if(file == undefined){
        fileName="";
      } 
      else{
        fileName = file.filename;
      }
        let name = req.body.name;
        let categoryId = req.body.categoryId;
        let id = req.body.id;
        let price =req.body.price;
        let quantity = req.body.quantity;
        
        console.log(file);
        let status = 1;
        if(id==""){
          id=0;
        }
        let description = req.body.description;
        console.log(id);
        console.log(name);
        let linkImage = "https://web-shopping-admin.herokuapp.com/uploads/"+fileName;
        console.log(linkImage);
        if(id == 0){
          
          let sql='INSERT INTO products(id_category,name,price,quantity,image,detail,status) VALUES ('+categoryId+',"'+name+'",'+price+','+quantity+',"'+linkImage+'","'+description+'",'+status+')';
          con.query(sql);
        }
        else{
          if(linkImage == "https://web-shopping-admin.herokuapp.com/uploads/"){
            let sql = 'UPDATE products SET name="'+name+'",id_category= '+categoryId+' ,price='+price+', status= '+status+' ,quantity= '+quantity+' ,detail= "'+description+'" WHERE id='+id;
            con.query(sql);
          }
          else{
            let sql = 'UPDATE products SET name="'+name+'",id_category= '+categoryId+' ,price='+price+', status= '+status+' ,quantity= '+quantity+' , image= "'+linkImage+'" ,detail= "'+description+'" WHERE id='+id;
            con.query(sql);
          }
        }
        con.query('select * from products', function (err, rows, fields) {
          if (err) throw err
          productsAll = [];
          rows.forEach(element => {
            var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.image,element.id_category, element.status);
            productsAll.push(x);
          })
        });
          res.redirect('/san-pham');
      }
  });
  
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
    con.query('select * from products', function (err, rows, fields) {
      if (err) throw err
      productsAll = [];
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.image,element.id_category, element.status);
        productsAll.push(x);
      });
      res.redirect('/san-pham');
    });
  });
}

module.exports = router;
