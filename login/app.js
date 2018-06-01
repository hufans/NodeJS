var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require("./routes/login");
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function deal(req,res,data){
    var pass = req.body;
    var mysql = require('./mysql/sql');  
    var name = pass.name;  
    var password = pass.password;  
    var sql = "SELECT * FROM t_user WHERE name = '"+name+"' AND password = '"+password+"'";  
    mysql.query(sql,function(data){  
        showpage(req,res,data);  
    }); 
}
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/login",loginRouter);
app.use("/dologin",function (request,res,data){
        var a="";  
        request.setEncoding("utf8");   
        var x = request.body
        deal(request,res,data)
});

app.use("/chat",indexRouter)
app.use('/modify',function(req,res,data){  
    var mysql = require('./mysql/sql'); 
    var id = req.url; 
    // var id = data.id; 
    var truth = id.slice(5) 

    var sql = "SELECT * FROM t_user WHERE id = '"+truth+"'";  
    mysql.query(sql,function(dataR){  
        modifyview(req,res,dataR);  
    }) 
})


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });

  http.listen(4000, function(){
    console.log('listening on *:4000');
  });

//函数使用
function showpage(req,res,data){  
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
    var json = "";
    if(data != ''){ //data[0].name+data[0].password
        hash.update("hufan"); 
        var token = hash.digest('hex')
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
            json = JSON.stringify({   
                token 
              }); 
            str+="</tr></table>";  
    }else{  

        var str = "<h1>登录失败</h1>";  
            str+="<a href='/login'>返回登录</a>";  
    };
    res.write(str);   
    // res.json(token)
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
module.exports = app;
