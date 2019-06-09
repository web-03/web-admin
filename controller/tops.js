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
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  Date(created_at) ="'+fromDay+'" GROUP BY(od.id_product)', function (err, rows, fields) {
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
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  created_at BETWEEN "'+from+'" AND "'+to+'" GROUP BY(od.id_product)  ', function (err, rows, fields) {
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
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  created_at  BETWEEN "'+fromDay+'" AND "'+toDay+'"  GROUP BY(od.id_product)', function (err, rows, fields) {
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
  let CategoriesName1=[];let CategoriesName2=[];let CategoriesName3=[];let CategoriesName4=[];
  for (d = 0; d < 3; d++) {
    let r1 = new reportDay(('Tháng ' + (d + 1)), 0);
    let r2 = new reportDay(('Tháng ' + (d + 4)), 0);
    let r3 = new reportDay(('Tháng ' + (d + 7)), 0);
    let r4 = new reportDay(('Tháng ' + (d + 10)), 0);
    TopProduct1.push(r1);
    TopProduct2.push(r2);
    TopProduct3.push(r3);
    TopProduct4.push(r4);
  }
  
  
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName,MONTH(o.created_at) as orderDay from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  YEAR(created_at)="' + year + '"  GROUP BY(od.id_product)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      switch (element.orderDay) {
        case 1:
          var x = new reportDay(element.ProductName, element.Count);
          TopProduct1[0] = x;
           CategoriesName1.push(element.categorieName);       
           totalAmount1+=x.total;
          break;
        case 2:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct1[1] = x;
           CategoriesName1.push(element.categorieName);       
           totalAmount1+=x.total;
          break;
        case 3:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct1[2] = x;
           CategoriesName2.push(element.categorieName);       
           totalAmount2+=x.total;
          break;
        case 4:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct2[0] = x;
           CategoriesName2.push(element.categorieName); 
           totalAmount2+=x.total;
          break;
        case 5:
           var x = new reportDay(element.ProductName, element.Count);
           TopProduct2[1] = x;
           CategoriesName2.push(element.categorieName); 
           totalAmount2+=x.total;
          break;
        case 6:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct2[2] = x;
           CategoriesName2.push(element.categorieName); 
           totalAmount2+=x.total;
          break;
        case 7:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct3[0] = x;
          CategoriesName3.push(element.categorieName);
          totalAmount3+=x.total;
          break;
        case 8:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct3[1] = x;
           CategoriesName3.push(element.categorieName);
           totalAmount3+=x.total;
          break;
        case 9:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct3[2] = x;
           CategoriesName3.push(element.categorieName);
           totalAmount3+=x.total;
          break;
        case 10:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct4[0] = x;
          CategoriesName4.push(element.categorieName);
          totalAmount4+=x.total;
          break;
        case 11:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct4[1] = x;
          CategoriesName4.push(element.categorieName); 
          totalAmount4+=x.total;
          break;
        case 12:
           var x = new reportDay(element.ProductName, element.Count);
          TopProduct4[2] = x;
          CategoriesName4.push(element.categorieName);
          totalAmount4+=x.total;
          break;
      }
    });
    res.render('top/quaterproducts', { TopProduct1: TopProduct1, TopProduct2: TopProduct2, TopProduct3: TopProduct3, TopProduct4: TopProduct4, totalAmount1: totalAmount1, totalAmount2: totalAmount2, totalAmount3: totalAmount3, totalAmount4: totalAmount4, CategoriesName1: CategoriesName1,CategoriesName2: CategoriesName2,CategoriesName3: CategoriesName3,CategoriesName4: CategoriesName4, year:year ,user: req.user});
  });
};
router.year = (req, res, next) => {
  let year = req.query.year;
  if(year == undefined){
    let a = new Date();
    year = (1900 + a.getYear());
  }
  let reportDays = [];
  for (d = 0; d < 12; d++) {
    let r = new reportDay(('Tháng ' + (d + 1)), 0);
    reportDays.push(r);
  }
  let totalAmount = 0;
  con.query('SELECT MONTH(created_at) as orderDay, SUM(sum_money) AS total FROM `orders` WHERE YEAR(created_at)="' + year + '"  GROUP BY MONTH(created_at)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      switch (element.orderDay) {
        case 1:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[0] = x;
          totalAmount += x.total;
          break;
        case 2:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[1] = x;
          totalAmount += x.total;
          break;
        case 3:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[2] = x;
          totalAmount += x.total;
          break;
        case 4:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[3] = x;
          totalAmount += x.total;
          break;
        case 5:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[4] = x;
          totalAmount += x.total;
          break;
        case 6:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[5] = x;
          totalAmount += x.total;
          break;
        case 7:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[6] = x;
          totalAmount += x.total;
          break;
        case 8:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[7] = x;
          totalAmount += x.total;
          break;
        case 9:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[8] = x;
          totalAmount += x.total;
          break;
        case 10:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[9] = x;
          totalAmount += x.total;
          break;
        case 11:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[10] = x;
          totalAmount += x.total;
          break;
        case 12:
          var x = new reportDay(('Tháng ' + element.orderDay), element.total);
          reportDays[11] = x;
          totalAmount += x.total;
          break;
      }
    });
    res.render('report/year', { reportDays: reportDays, totalAmount: totalAmount, year: year ,user: req.user});
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
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  Date(created_at) ="'+fromDay+'" GROUP BY(od.id_product)', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(element => {
      
      var x = new reportDay(element.categorieName, element.Count);
      CategoriesName.push(x);
      totalAmount+=x.total;
    });
    for(var i=0;i<CategoriesName.length;i++)
     for( var j=i+1;j<CategoriesName.length-1;j++)
    {
      if (CategoriesName[i].create==CategoriesName[j].create)
         {
           tong=CategoriesName[i].total+CategoriesName[j].total;
           CategoriesName[i].total=tong;
           CategoriesName[j].total=tong;
         }
        }
    for(var i=1;i<CategoriesName.length;i++)
     for( var j=0;j<i;j++)
     {
      if (CategoriesName[i].create==CategoriesName[j].create)
      {
      for (var k = i; k < CategoriesName.length; k++) 
				{
          CategoriesName[k].create = CategoriesName[k + 1].create;
					CategoriesName[k].total = CategoriesName[k + 1].total;        
					CategoriesName.length--;
					i--;
				}
			}
		}
	

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
 
  let tong=0;
  let CategoriesName =[];
  let query = 
  con.query('select (p.name) as ProductName, count(p.id) as Count,(c.name) as categorieName from products p, order_detail od, orders o,categories c where p.id = od.id_product and o.id = od.id_order and c.id=p.id_category and  created_at BETWEEN "'+from+'" AND "'+to+'" GROUP BY(od.id_product)  ', function (err, rows, fields) {
    
    if (err) throw err
    rows.forEach(element => {
      
      var x = new reportDay(element.categorieName, element.Count);
      CategoriesName.push(x);
      totalAmount+=x.total;
    });
    for(var i=0;i<CategoriesName.length;i++)
     for( var j=i+1;j<CategoriesName.length-1;j++)
    {
      if (CategoriesName[i].create==CategoriesName[j].create)
         {
           tong=CategoriesName[i].total+CategoriesName[j].total;
           CategoriesName[i].total=tong;
           CategoriesName[j].total=tong;
         }
    }
    
    
 

    res.render('top/categoryweeks', {  CategoriesName:CategoriesName,totalAmount:totalAmount, to : to ,from:from,user: req.user});
  });
};
module.exports = router;
