var express = require('express');
var router = express.Router();
var mysql = require('./../mysql/sql');

router.all("*",function(req,res,next){
    //if already login
    // var url = req.baseUrl
    console.log(req.originalUrl); // '/admin/new'
    console.log(req.baseUrl); // '/admin'
    console.log(req.path); // '/new'
    if(req.cookies.user){
        if (req.originalUrl==="login" || req.originalUrl ==="dologin" || req.originalUrl ==="/" ) {
            deal(req,res)
        }else{
            next();
        }
    }else{//Not yet logged in
        if(req.baseUrl.indexOf("modify")!=-1){  
            res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
            var str = "<form action='/dologin' method='post'>"+  
             "帐号:<input type ='text' name='name'><br/><br/>"+  
             "密码:<input type ='password' name='password'><br/><br/>"+  
             "  <input type ='submit' value='提交'></form>";  
           res.write(str); 
           res.end();   
        }else{
            next()
        }
    }
    });

    function deal(req,res){
        var name = req.cookies.user;  
        var sql = "SELECT * FROM t_user WHERE name = '"+name+"'";  
        mysql.query(sql,function(data){
            showpage(req,res,data);
        }); 
    }

    //函数使用
    function showpage(req,res,data){  
        res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
        if(data != ''){ //data[0].name+data[0].password
            //login success 
            var str ="<h1>你好啊</h1>";  
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
               
        }
        res.write(str);  
        res.end();
    }  
    module.exports = router;