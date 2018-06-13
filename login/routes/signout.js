var express = require('express');
var router = express.Router();

//用户登出
router.get('/', function(req, res, next){ 
    req.session.destroy(function(err){
        if ( !err ){
            return res.redirect('/');
        } else {
            next(new Error(err.msg))
        }
    })
});

module.exports = router;