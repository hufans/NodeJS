var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
var mysql = require('./../mysql/sql');

router.post('/', function(req,res,data){  
    var a = "";  
    req.setEncoding("utf8");   
    var x = req.body
    //judge cookies
    if(req.cookies.user){
        //already login
        deal(req,res,data,true)
      }else{
        deal(req,res,data,false)
      }
});

function deal(req,res,data){

    var pass = req.body;
    var name = pass.name;  
    var password = pass.password;  
    var sql = "SELECT * FROM t_user WHERE name = '"+name+"' AND password = '"+password+"'";  
    mysql.query(sql,function(data){
        showpage(req,res,data);
    }); 
}
//函数使用
function showpage(req,res,data){  
    res.cookie("user",data[0].name)
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
    if(data != ''){ //data[0].name+data[0].password
        //login success 
        var str = "<h1>你好啊</h1>";  
            str+="帐号:"+data[0].name+"<br>";  
            str+="密码:"+data[0].password;  
            str+="<table border='1' width='400px'>";  
            str+="<tr><th>姓名</th><th>电话</th><th>年龄</th><th>操作</th></tr>";  
            for (var i = data.length - 1; i >= 0; i--) {  
                str+="<tr>";  
                str+="<td>"+data[i].name+"</td>";  
                str+="<td>"+data[i].tel+"</td>";  
                str+="<td>"+data[i].age+"</td>";  
                str+="<td><a href='/modify?id="+data[i].id+"'>修改</a></td>";
                str+="<img src=\"./images/header.png\"alt=\"header\" />"
                str+="</tr>";  
            };  
            str+="</tr></table>";  
           
    }else{  

        var str = "<h1>登录失败</h1>";  
            str+="<a href='/login'>返回登录</a>";  
    };
    res.write(str);  
    res.end();   
}  
module.exports = router;