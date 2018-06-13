var express = require('express');
var router = express.Router();

//用户登出
router.get('/', function ( req, res, next ) { 
    req.session.destroy(function(err){
        if ( err ) {
            return next(new Error( err.msg ));
        }
        res.redirect('/');
    })
});

module.exports = router;