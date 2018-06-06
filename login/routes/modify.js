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
    
    var str = "<img src=\"./images/header.png\"alt=\"header\" />"+'<form action="/modifyUser" enctype="multipart/form-data" method="post">'+
    '账号<input type="text" value = '+data[0].name+'><br>'+
    '密码<input type="text" value = '+data[0].password+'><br>'+
    '年龄<input type="text" value = '+data[0].age+'><br>'+
    '电话<input type="text" value = '+data[0].tel+'><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    res.write(str);   
    res.end();   
}  
module.exports = router;