var express = require('express');
var router = express.Router();
var mysql = require("../mysql/sql")
var templates = require("../views/productView") 

router.get("/",function(req, res, next){
    // async.waterfall(
    //     [
    //         function (callback) {
    //             getProductFromDataBase(id,function(err,sqldata){
    //                 var data = {};
    //                 data.currentProduct = sqldata;
    //                 callback(err,data)
    //             })
    //         },
    //         function (Data, callback) {
                
    //         }
    //     ], function (err, templateView) {
    //         if (err) {
    //             next(err)
    //         }
    //         var storageDescription_Str = GetInventoryBaseDefaultAddress(data,req.session.user)
    //         var strTemplate = templates.getProductTemplate(data,storageDescription_Str)
    //         renderTemplate(res,strTemplate);
    //     }
    // )

    
    getProductFromDataBase(req,res,next);
    
})

function getProductFromDataBase(req,res,next){
    var id = 327;
    var sqlQuery = "SELECT * FROM t_product WHERE product_id = '" + id + "'";
    setTimeout(function(){
        mysql.query(sqlQuery,function(err,data){
            if (err) return next(err);
            setTimeout(function(){
                var storageDescription_Str = GetInventoryBaseDefaultAddress(data,req.session.user);
                setTimeout(function(){
                    var species =  getSpecies(data)
                    renderTemplate(res,templates.getHtml(data,storageDescription_Str,species))
                },1000)
            },1000) 
        })
    },1000);  
}


function renderTemplate(res, template) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
    res.write(template);
    res.end();
}

//获取仓库位置
function GetInventoryBaseDefaultAddress(productdata,userdata){
    //http://ip.taobao.com/service/getIpInfo.php?ip=121.35.211.41 //获取ip地址优化内容
    var place = productdata[0].product_inventory_place.split("|")
    if (!userdata){
        return "北京";
    }
    if (userdata.address in place) {
        return userdata.address;
    }
    return "北京";
}

function getSpecies(productdata){
    return productdata[0].product_associate_id.split("|")
}

module.exports = router;