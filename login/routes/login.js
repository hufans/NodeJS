var express = require('express');
var router = express.Router();

router.use('/', function(req,res){  
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
        var str = "<form action='/dologin' method='post'>"+  
         "帐号:<input type ='text' name='name'><br/><br/>"+  
         "密码:<input type ='password' name='password'><br/><br/>"+  
         "  <input type ='submit' value='提交'></form>";  
       res.write(str); 
       res.end();   
});

module.exports = router;