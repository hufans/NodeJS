var express = require('express');
var router = express.Router();

router.get('/', function(req,res){  
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
        var str = "<form action='/dologin' method='post'>"+  
         "帐号:<input type ='text' name='name'><br/><br/>"+  
         "密码:<input type ='password' name='password'><br/><br/>"+  
         "  <input type ='submit' value='提交'></form>";  
       res.write(str);   
       res.end();   
});
// router.get =  

router.get('/deal',function(req,res,data){
    var mysql = require('./mysql');  
    var name = data.name;  
    var password = data.password;  
    var sql = "SELECT * FROM t_user WHERE name = '"+name+"' AND password = '"+password+"'";  
    mysql.query(sql,function(data){  
  
            showpage(req,res,data);  
    }); 
})

router.get('/dealget',function(req,res,data){  
    var mysql = require('../mysql/sql');  
    var id = data.id;  

    var sql = "SELECT * FROM t_user WHERE id = '"+id+"'";  
    mysql.query(sql,function(data){  
        modifyview(req,res,data);  
    }) 
})


function showpage(req,res,data){  
      res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
      if(data != ''){  
            
          var str = "<h1>登录成功</h1>";  
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
                  str+="</tr>";  
              };  
              str+="</tr></table>";  
      }else{  

          var str = "<h1>登录失败</h1>";  
              str+="<a href='/login'>返回登录</a>";  
      }     
      res.write(str);   
      res.end();   
}  
function modifyview(req,res,data){  

      res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  

      var str = "帐号:<input name='name' value="+data[0].name+"><br>";  
          str = "密码:<input name='name' value="+data[0].password+"><br>";  
          str+="年龄:<input name='age' value="+data[0].age+"><br>";  
          str+="电话:<input name='age' value="+data[0].tel+"><br>";  
          str+="<input type='submit' onclick=javascript:alert('修改成功') value='提交'><br>";  
          str+="<a href='javascript:void(0)' onclick='window.history.go(-1)'>返回列表</a>";  
      res.write(str);   
      res.end();   

}  

module.exports = router;