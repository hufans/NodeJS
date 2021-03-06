
//两周不同的写法
var template = {
     userProfileHtmlTemplate : function (userData,headerPath) {
        return `
            <h1>你好啊</h1>
            <div>
                <p>Account: ${userData.name}</p>
                <div>
                    <img 
                        src=${headerPath}
                        alt=\"header\" 
                        width='64px' 
                        height='64px' 
                    />
                <div/>
                <table border='1' width='400px'>
                    <tr>
                        <th>姓名</th><th>电话</th><th>年龄</th><th>操作</th>
                    </tr>
                    <tr>
                        <td>${userData.name}</td>
                        <td>${userData.tel}</td>
                        <td>${userData.age}</td>
                        <td><a href='/modify'>修改</a></td>
                    </tr>
                </table></td>
                <td><a href='/signout'>登出</a></td>
            </div>
        `;
    }
};


//  获取修改模版
template.getModifyPageTemplate = function(userData,headerPath) {
    return `
    <div>
        <img 
            src=${headerPath}
            alt=\"header\" 
            width='64px' 
            height='64px' 
        />
        <form action="/modify/header" enctype="multipart/form-data" method="post">
            <input type="file" name="upload" multiple="multiple"><br>     
            <input type="submit" value="上传">
        </form> 
    </div>
  
    <div>
      <form action="/modify/msg"  method="post">  
        <td>
          密码:<input type ='text' name='password'></br>
          年龄:<input type ='text' name='age' value = ${userData.age}></br>
          电话:<input type ='text' name='tel' value = ${userData.tel}></br>
        </td>
        <input type ='submit' value='修改'>
      </form>
    </div>
  `;
}

template
.getLoginTemplate = function() {
    return `
      <div>
        <h1>欢迎</h1>
        <a href='/login'>点我登录</a>
      </div>
    `;
  }

template. userNotFoundHtmlTemplate = function() {
    return `
        <h1>User Not Found!</h1>
        <p>
            <a href='/profile'>Refresh Current Page pls!</a>
        </p>
    `
}
module.exports = template;