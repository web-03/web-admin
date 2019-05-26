var express = require('express');
var con = require('./../config/key');
var passport = require('passport'); // pass passport for configuration
var router = express.Router();

/* GET home page. */
router.home = (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('index', { title: 'Quản lí bán hàng' ,user: req.user});
} else {
    req.flash('loginMessage')
    res.redirect('/dang-nhap');
}
  
};


router.login = (req, res, next) => {
  res.render('login/login',{ message: req.flash('loginMessage') })
};

router.logout=(req,res,next)=>
{
  req.logout();
  res.redirect('/');
}

router.postLogin = (req,res,next) =>{
  passport.authenticate('local-login',{
    successRedirect: '/',
    failureRedirect: '/dang-nhap',
    failureFlash: true
  },function(err, user, info) {
    
    
    if(err) {
      req.flash('loginMessage', err.message)
      return res.redirect('/dang-nhap');
    }

    if(!user) {
      req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
      return res.redirect('/dang-nhap');
    }

    return req.logIn(user, function(err) {
        if(err) {
          req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
          return res.redirect('/dang-nhap');
          
        } else {
            return res.redirect('/');
        }
    });
})(req, res, next);
  
}


module.exports = router;
