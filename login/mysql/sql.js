var mysql = require("mysql"); 
var connection  = mysql.createConnection({  
  
    host:'localhost',  
    user:'root',//账号  
    password:'fanhu123',//密码  
    database:'mysql' //数据库名字  
   
 });  
 connection.connect();  
   
 //查询数据  //modify data
 function query(sql,callback){  
         connection.query(sql, function(err, rows, fields) {  
             if (err) throw err;  
              callback(rows);  
       });  
     //connection.end();  
 }
 exports.query = query; 