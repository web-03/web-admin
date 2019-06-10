var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const reportDay = require('./../model/report');


/* GET home page. */
router.dayproducts = (req, res, next) => {
  
  let to = req.query.from;
  
  let fromDay="";
  if(to == undefined){
    let a = new Date();
    fromDay = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    if(a.getMonth()<9){
      if(a.getDate()<10){
        to = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-0' + a.getDate();
      }
      else{
        to = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-' + a.getDate();
      }
    }
    else{
      to = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    }
  }
  else{
    let tday = new Date(to);
    fromDay = (1900 + tday.getYear()) + '-' + (tday.getMonth()+1) + '-' + tday.getUTCDate();
  }
  let totalAmount=0;
  let TopProduct = [];
  let CategoriesName =[];
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  Date(created_at) ="'+fromDay+'" GROUP BY(od.id_product)ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.ProductName, element.Count);
      TopProduct.push(x);
      CategoriesName.push(element.categorieName);
      totalAmount+=x.total;
    });
    
    res.render('top/dayproducts', { TopProduct: TopProduct, CategoriesName:CategoriesName,totalAmount:totalAmount, to : to ,user: req.user});
  });
};

 

router.weekproducts = (req, res, next) => {
  
  let totalAmount = 0;
  let from = req.query.from;
  let to="";
  if(from == undefined){
    let a = new Date();
    //from = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    let toDay = new Date(a.getFullYear(), (a.getMonth()), a.getDate() + 7);
    to = (1900 + toDay.getYear()) + '-' + (toDay.getMonth()+1) + '-' + toDay.getDate();
    if(a.getMonth()<9){
      if(a.getDate()<10){
        from = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-0' + a.getDate();
      }
      else{
        from = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-' + a.getDate();
      }
    }
    else{
      from = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    }
  }
  else{
    let a = new Date(from);
    let tday = new Date(a.getFullYear(), (a.getMonth()), a.getDate() + 7);
    //from = (1900 + a.getYear()) + '-' + (a.getMonth()) + '-' + a.getDate();
    if(a.getMonth()<9){
      if(a.getDate()<10){
        from = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-0' + a.getDate();
      }
      else{
        from = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-' + a.getDate();
      }
    }
    else{
      from = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    }
    to = (1900 + tday.getYear()) + '-' + (tday.getMonth()+1) + '-' + tday.getDate();
  }
  let TopProduct=[];
  let CategoriesName=[];
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  created_at BETWEEN "'+from+'" AND "'+to+'" GROUP BY(od.id_product) ORDER BY Count DESC LIMIT 0,10 ', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.ProductName, element.Count);
      TopProduct.push(x);
      CategoriesName.push(element.categorieName);
      totalAmount+=x.total;
    });
    
    res.render('top/weekproducts', { TopProduct: TopProduct, totalAmount:totalAmount,CategoriesName:CategoriesName, to:to, from:from ,user: req.user});
});
};
router.monthproducts= (req, res, next) => {
  let fromDay = "";
  let toDay = "";
  let a = new Date();
  let month = req.query.month;
  if(month == undefined){
    
    month = a.getMonth()+1;
    fromDay = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + 1;
    toDay = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + new Date((1990+a.getYear()), month, 0).getDate();
  }
  else{
    fromDay = (1900 + a.getYear()) + '-' + month + '-' + 1;
    toDay = (1900 + a.getYear()) + '-' + month + '-' + new Date((1990+a.getYear()), month, 0).getDate();
  }
  let TopProduct = [];
  let totalAmount = 0;
  let CategoriesName=[];
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  created_at  BETWEEN "'+fromDay+'" AND "'+toDay+'"  GROUP BY(od.id_product) ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.ProductName, element.Count);
      TopProduct.push(x);
      CategoriesName.push(element.categorieName);
      totalAmount+=x.total;
    });
   
    res.render('top/monthproducts', { TopProduct: TopProduct, totalAmount: totalAmount, month:month ,user: req.user});
  });
};

router.quaterproducts = (req, res, next) => {
  let year = req.query.year;
  if(year == undefined){
    let a = new Date();
    year = (1900 + a.getYear());
  }
  let TopProduct1 = [], TopProduct2 = [], TopProduct3 = [], TopProduct4 = [];
  let totalAmount1 = 0, totalAmount2 = 0,totalAmount3 = 0, totalAmount4 = 0;
  
  
   
  
  
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName, MONTH(o.created_at) as orderDay from products p, order_detail od, orders o,categories c WHERE p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and o.created_at and YEAR(o.created_at)="' + year + '" GROUP BY od.id_product, MONTH(o.created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      switch (element.orderDay) {
        case 1:
          var x = new reportDay(element.ProductName, element.Count);
          TopProduct1.push(x);      
          totalAmount1+=x.total;
          break;
        case 2:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct1.push(x);
          totalAmount1+=x.total;
          break;
        case 3:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct1.push(x);  
           totalAmount2+=x.total;
          break;
        case 4:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct2.push(x);
           totalAmount2+=x.total;
          break;
        case 5:
           var x = new reportDay(element.ProductName, element.Count);
           TopProduct2.push(x);
           totalAmount2+=x.total;
          break;
        case 6:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct2.push(x);
           totalAmount2+=x.total;
          break;
        case 7:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct3.push(x);
          totalAmount3+=x.total;
          break;
        case 8:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct3.push(x);
           totalAmount3+=x.total;
          break;
        case 9:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct3.push(x);
           totalAmount3+=x.total;
          break;
        case 10:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct4.push(x);
          totalAmount4+=x.total;
          break;
        case 11:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct4.push(x);
          totalAmount4+=x.total;
          break;
        case 12:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct4.push(x);
          totalAmount4+=x.total;
          break;
      }
    });
    TopProduct1.sort(function(a,b){return b.total-a.total});
    TopProduct2.sort(function(a,b){return b.total-a.total});
    TopProduct3.sort(function(a,b){return b.total-a.total});
    TopProduct4.sort(function(a,b){return b.total-a.total});
    res.render('top/quaterproducts', { TopProduct1: TopProduct1, TopProduct2: TopProduct2, TopProduct3: TopProduct3, TopProduct4: TopProduct4, totalAmount1: totalAmount1, totalAmount2: totalAmount2, totalAmount3: totalAmount3, totalAmount4: totalAmount4,  year:year ,user: req.user});
  });
};
router.yearproducts=(req,res,next)=>{
  let year = req.query.year;
  if(year == undefined){
    let a = new Date();
    year = (1900 + a.getYear());
  }
  let TopProduct = [];
  let totalAmount=0;
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c WHERE p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and o.created_at and YEAR(o.created_at)="' + year + '" GROUP BY od.id_product ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x=new reportDay(element.ProductName, element.Count);
      TopProduct.push(x);
      totalAmount+=x.total;
    });
    
    res.render('top/yearproducts',{TopProduct:TopProduct,year:year,totalAmount:totalAmount,user:req.user});
  
});
};
router.daytodayproducts=(req,res,next)=>{
  let to = req.query.to;
  let from = req.query.from;
  let TopProduct = [];
  let totalAmount=0;
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c WHERE p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and created_at BETWEEN "'+from+'" AND "'+to+'" GROUP BY od.id_product ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x=new reportDay(element.ProductName, element.Count);
      TopProduct.push(x);
      totalAmount+=x.total;
    });
    
    res.render('top/daytodayproducts',{TopProduct:TopProduct,to:to,from:from,totalAmount:totalAmount,user:req.user});
  
});
};

router.categorydays = (req, res, next) => {
  
  let to = req.query.from;
  
  let fromDay="";
  if(to == undefined){
    let a = new Date();
    fromDay = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    if(a.getMonth()<9){
      if(a.getDate()<10){
        to = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-0' + a.getDate();
      }
      else{
        to = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-' + a.getDate();
      }
    }
    else{
      to = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    }
  }
  else{
    let tday = new Date(to);
    fromDay = (1900 + tday.getYear()) + '-' + (tday.getMonth()+1) + '-' + tday.getUTCDate();
  }
  let totalAmount=0;
  let tong=0;
  let CategoriesName =[];
  con.query('select count(c.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  Date(created_at) ="'+fromDay+'" GROUP BY(c.id)ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      
      var x = new reportDay(element.categorieName, element.Count);
      CategoriesName.push(x);
      totalAmount+=x.total;
    });
   

    res.render('top/categorydays', {  CategoriesName:CategoriesName,totalAmount:totalAmount, to : to ,user: req.user});
  });
};
router.categoryweeks = (req, res, next) => {
  
  let totalAmount = 0;
  let from = req.query.from;
  let to="";
  if(from == undefined){
    let a = new Date();
    //from = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    let toDay = new Date(a.getFullYear(), (a.getMonth()), a.getDate() + 7);
    to = (1900 + toDay.getYear()) + '-' + (toDay.getMonth()+1) + '-' + toDay.getDate();
    if(a.getMonth()<9){
      if(a.getDate()<10){
        from = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-0' + a.getDate();
      }
      else{
        from = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-' + a.getDate();
      }
    }
    else{
      from = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    }
  }
  else{
    let a = new Date(from);
    let tday = new Date(a.getFullYear(), (a.getMonth()), a.getDate() + 7);
    //from = (1900 + a.getYear()) + '-' + (a.getMonth()) + '-' + a.getDate();
    if(a.getMonth()<9){
      if(a.getDate()<10){
        from = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-0' + a.getDate();
      }
      else{
        from = (1900 + a.getYear()) + '-0' + (a.getMonth()+1) + '-' + a.getDate();
      }
    }
    else{
      from = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + a.getDate();
    }
    to = (1900 + tday.getYear()) + '-' + (tday.getMonth()+1) + '-' + tday.getDate();
  }
 
  
  let CategoriesName =[];
  
  con.query('select  count(c.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  created_at BETWEEN "'+from+'" AND "'+to+'" GROUP BY(c.id) ORDER BY Count DESC LIMIT 0,10 ', function (err, rows, fields) {
    
    if (err) throw err
    rows.forEach(element => {
      
      var x = new reportDay(element.categorieName, element.Count);
      CategoriesName.push(x);
      totalAmount+=x.total;
    });
    
   
    res.render('top/categoryweeks', {  CategoriesName:CategoriesName,totalAmount:totalAmount, to : to ,from:from,user: req.user});
  
  });
};
router.categorymonths= (req, res, next) => {
  let fromDay = "";
  let toDay = "";
  let a = new Date();
  let month = req.query.month;
  if(month == undefined){
    
    month = a.getMonth()+1;
    fromDay = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + 1;
    toDay = (1900 + a.getYear()) + '-' + (a.getMonth()+1) + '-' + new Date((1990+a.getYear()), month, 0).getDate();
  }
  else{
    fromDay = (1900 + a.getYear()) + '-' + month + '-' + 1;
    toDay = (1900 + a.getYear()) + '-' + month + '-' + new Date((1990+a.getYear()), month, 0).getDate();
  }
  let TopProduct = [];
  let totalAmount = 0;
  
  con.query('select count(c.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  o.created_at  BETWEEN "'+fromDay+'" AND "'+toDay+'"  GROUP BY(c.id) ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x = new reportDay(element.categorieName, element.Count);
      TopProduct.push(x);
      totalAmount+=x.total;
    });
  
    res.render('top/categorymonths', { TopProduct: TopProduct, totalAmount: totalAmount, month:month ,user: req.user});
  });
};

router.categoryquarters = (req, res, next) => {
  let year = req.query.year;
  if(year == undefined){
    let a = new Date();
    year = (1900 + a.getYear());
  }
  let TopProduct1 = [], TopProduct2 = [], TopProduct3 = [], TopProduct4 = [];
  let totalAmount1 = 0, totalAmount2 = 0,totalAmount3 = 0, totalAmount4 = 0;
  
  
   
  
  
  con.query('select  count(p.id) as Count,(c.name) as categorieName, MONTH(o.created_at) as orderDay from products p, order_detail od, orders o,categories c WHERE p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and o.created_at and YEAR(o.created_at)="' + year + '" GROUP BY c.id, MONTH(o.created_at) ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      switch (element.orderDay) {
        case 1:
          var x = new reportDay(element.TopProduct, element.Count);
          TopProduct1.push(x);      
          totalAmount1+=x.total;
          break;
        case 2:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct1.push(x);
          totalAmount1+=x.total;
          break;
        case 3:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct1.push(x);  
           totalAmount2+=x.total;
          break;
        case 4:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct2.push(x);
           totalAmount2+=x.total;
          break;
        case 5:
           var x = new reportDay(element.categorieName, element.Count);
           TopProduct2.push(x);
           totalAmount2+=x.total;
          break;
        case 6:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct2.push(x);
           totalAmount2+=x.total;
          break;
        case 7:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct3.push(x);
          totalAmount3+=x.total;
          break;
        case 8:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct3.push(x);
           totalAmount3+=x.total;
          break;
        case 9:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct3.push(x);
           totalAmount3+=x.total;
          break;
        case 10:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct4.push(x);
          totalAmount4+=x.total;
          break;
        case 11:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct4.push(x);
          totalAmount4+=x.total;
          break;
        case 12:
           var x = new reportDay(element.categorieName, element.Count);
          TopProduct4.push(x);
          totalAmount4+=x.total;
          break;
      }
    });
    
    res.render('top/categoryquarters', { TopProduct1: TopProduct1, TopProduct2: TopProduct2, TopProduct3: TopProduct3, TopProduct4: TopProduct4, totalAmount1: totalAmount1, totalAmount2: totalAmount2, totalAmount3: totalAmount3, totalAmount4: totalAmount4,  year:year ,user: req.user});
  });
};
router.categoryyears=(req,res,next)=>{
  let year = req.query.year;
  if(year == undefined){
    let a = new Date();
    year = (1900 + a.getYear());
  }
  let TopProduct = [];
  let totalAmount=0;
  con.query('select  count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c WHERE p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and o.created_at and YEAR(o.created_at)="' + year + '" GROUP BY c.id ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x=new reportDay(element.categorieName, element.Count);
      TopProduct.push(x);
      totalAmount+=x.total;
    });
   
    res.render('top/categoryyears',{TopProduct:TopProduct,year:year,totalAmount:totalAmount,user:req.user});
  
});
};
router.categorydaytoday=(req,res,next)=>{
  let to = req.query.to;
  let from = req.query.from;
  let TopProduct = [];
  let totalAmount=0;
  con.query('select  count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c WHERE p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and created_at BETWEEN "'+from+'" AND "'+to+'" GROUP BY c.id ORDER BY Count DESC LIMIT 0,10', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      var x=new reportDay(element.categorieName, element.Count);
      TopProduct.push(x);
      totalAmount+=x.total;
    });
    
    res.render('top/categorydaytoday',{TopProduct:TopProduct,to:to,from:from,totalAmount:totalAmount,user:req.user});
  
});
};

module.exports = router;
