var express = require('express');
var router = express.Router();
var mysql = require('./../mysql/sql'); 

router.get('/', function(req,res,data){

    var sql = "SELECT * FROM t_user WHERE id = '"+req.session.user.id+"';";  
    console.log(sql)
    mysql.query(sql,function(err, dataR){  
        console.log(dataR)
        modifyview(req,res,dataR);  
    }) 
});
function modifyview(req,res,data){ 

    req.session.userData = {};
    req.session.userData.login = true;
    req.session.userData.userName = data[0].name;
    req.session.userData.tel = data[0].tel;
    req.session.userData.age = data[0].age;
    req.session.userData.id = data[0].id;

    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'}); 
    //upload header img 
    var str = "<img src=\"/static/images/header.png\"alt=\"header\" />";
    str +='<form action="/modifyUser/header" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload" multiple="multiple"><br>'+     
        '<input type="submit" value="上传">'+
    '</form><br/>'

    //update user message
     str += '<form action="/modifyUser/msg"  method="post">'+  
        "密码:<input type ='text' name='password' value= "+data[0].password+"> <br/>"+ 
        "年龄:<input type ='text' name='age' value="+data[0].age+"><br/>"+
        "电话:<input type ='text' name='tel' value="+data[0].tel+"><br/>"+
        " <input type ='submit' value='修改'></form>";  

   res.write(str); 
   res.end(); 
}
module.exports = router;