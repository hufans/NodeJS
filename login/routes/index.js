var express = require('express');
var router = express.Router();
var templateView = require("./../views/templates");

router.get('/', function (req, res, next) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    if ( ! templateView.getLoginTemplate() ){
        return next(new Error( "404 Page Not Found !" ));
    } 
    res.write(templateView.getLoginTemplate());
    res.end();
});

module.exports = router;
