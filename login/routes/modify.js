var express = require('express');
var router = express.Router();
var mysql = require('./../mysql/sql'); 

router.get('/', function(req,res,data){    
    var id = req.url; 
    // var id = data.id; 
    var truth = id.slice(5) 
    var sql = "SELECT * FROM t_user WHERE id = '"+truth+"'";  
    mysql.query(sql,function(dataR){  
        modifyview(req,res,dataR);  
    }) 
});
function modifyview(req,res,data){  
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
    var str ="<img src=\"./images/header.png\"alt=\"header\" /><br>"  
        str+= "帐号:<input name='name' value="+data[0].name+"><br>";  
        str+="密码:<input name='password' value="+data[0].password+"><br>";  
        str+="年龄:<input name='age' value="+data[0].age+"><br>";  
        str+="电话:<input name='age' value="+data[0].tel+"><br>";
        
        str+="<input type='submit' onclick=javascript:alert('修改成功') value='提交'><br>"; 
        str+="<a href='javascript:void(0)' onclick='window.history.go(-1)'>返回列表</a>";  
    res.write(str);   
    res.end();   
}  
module.exports = router;