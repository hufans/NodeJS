var mysql = require("mysql"); 
var connection  = mysql.createConnection({  
  
    host:'localhost',  
    user:'root',//账号  
    // password:'',//密码  
    database:'test' //数据库名字  
   
 });  
 connection.connect();  
   
 //查询数据  
 function query(sql,callback){  
         connection.query(sql, function(err, rows, fields) {  
             if (err) throw err;  
              callback(rows);  
       });  
     //connection.end();  
 }  
 exports.query = query; 