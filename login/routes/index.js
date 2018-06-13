var express = require('express');
var router = express.Router();
var templateView = require("./../views/templated");

router.get('/', function (req, res, next) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    if ( templateView.getLoginTemplate() ){
        res.write(templateView.getLoginTemplate());
        res.end();  
    } else {
        next(new Error("404 Page Not Found !"));
    }
    
});

module.exports = router;
