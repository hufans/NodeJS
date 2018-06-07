var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});   
    str="<h1>欢迎</h1><a href='/login'>点我登录</a>";  
    res.write(str);   
    res.end();  
  });
router.post("/",function(req,res){
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});   
    str="<h1>欢迎</h1><a href='/login'>点我登录</a>";  
    res.write(str);   
    res.end();  
});

module.exports = router;
