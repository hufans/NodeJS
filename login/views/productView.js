
//两周不同的写法
var viewtemplate = {}
viewtemplate.getProductTemplate = function (sqldata,place) {
    sqldata = sqldata[0];
    // product_appraise_num //仓储数目
    // product_associate_id //关联产品
    console.log(sqldata.product_picture);
    return `
    <div>
        <h1>${sqldata.product_name}</h1>
        <div>
            <font size="5" color="red">${sqldata.product_discrption}
            <img 
                src=${sqldata.product_picture}
                alt=\"header\" 
                width='64px' 
                height='64px' 
            />
            </br>
            <font size="3" color="red">惊爆价${sqldata.product_price}</font></td> 
            <font size="3" color="green">原价${sqldata.product_original_price}</font></td>
            <font size="2" color="green">累计评价${sqldata.product_appraise_num}</font></td>
            <font size="2" color="green">库存${sqldata.product_inventory_num}</font></td> 
        <div/>
        <font size="2" color="green">库存${sqldata.product_inventory_num}</font></td>
        <font size="2" color="green">${place}-- 有货</font></td>
        <font size="2" color="green">上午十一点前下单当日达</font></td>
        <button type="button"></button>
        <font size="2" color="green">选择${sqldata.product_inventory_num}</font></td>
    </div>
    `
}

viewtemplate.getHtml = function(sqldata,place,species){
    sqldata = sqldata[0];
    return `<head>
    <meta charset="UTF-8">
    <title>testPage</title>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        a {
            text-decoration: none;
            cursor: pointer;
        }

        ul li {
            list-style: none;
        }

        .left {
            float: left;
        }

        #wrap {
            width: 600px;
            height: 450px;
            margin: 200px auto;
            border: 1px solid lightgrey;
            padding: 10px;
            background: beige;
        }

        #goods {
            font-size: 20px;
            color: silver;
            margin-bottom: 20px;
        }

        #show {
            width: 40%;
            height: auto;
            margin: 0 auto;
        }

        #desc {
            font-size: 14px;
            color: red;
            margin-bottom: 10px;
        }

        #desc a {
            color: royalblue;
        }

        #price_content, #post, #type{
            font-size: 14px;
            margin-bottom: 10px;
        }

        .clearfix:after {
            content: "";
            clear: both;
            display: block;
            overflow: hidden;
            font-size: 0;
            height: 0;
        }

        #price {
            color: red;
            font-size: 20px;
        }

        #former_price {
            text-decoration: line-through;
        }
        #notice {
            color: royalblue;
        }
        #right_wrap {
            float: right;
        }

        #judge {
            float: left;
            text-align: center;
        }

        #exponent {
            float: left;
            margin-left: 30px;
            text-align: center;
        }

        #judge_num,#exponent_num {
            font-weight: bold;
            color: forestgreen;
        }

        #post {
            margin-bottom: 20px;
        }

        #addr {
            color: darkgray;
        }

        #post_flag {
            color: gray;
        }

        #type li {
            border: 1px solid red;
            margin-right: 20px;
            float: left;
            display: inline-block;
        }

        #type li:first-child {
            margin-left: 10px;
        }


        #type li span {
            display: inline-block;
            margin-left: 5px;
            padding: 3px;
            text-align: center;
        }

    </style>

</head>
<body>

<div id="wrap">
    <h3 id="goods">${sqldata.product_name}</h3>
    <img id="show" src=${sqldata.product_picture}>
    <p id="desc">${sqldata.product_discrption}</p>
    <div id="price_content" class="clearfix">
        <span style="color: silver">秒杀价</span>
        <span id="price">￥${sqldata.product_price}</span>
        [<span id="former_price">${sqldata.product_original_price}</span>]
        <a id="notice">降价通知</a>
        <div id="store">
                <h3 style="color: silver;font-size: 12px">库存</h3>
                <span id="store_num">${sqldata.product_inventory_num}</span>
        </div>
        <div id="right_wrap" >
            
            <div id="judge">
                <h3 style="color: silver;font-size: 12px">商品评价</h3>
                <span id="judge_num">${sqldata.product_appraise_num}</span>
            </div>

            <div id="exponent">
                <h3 style="color: silver;font-size: 12px">选购指数</h3>
                <span id="exponent_num">${5.4}</span>
            </div>
        </div>
    </div>
    <div id="post">
        <span style="color: silver">配送至</span>
        <span id="addr">${place}</span>
        <span id="post_flag">有货</span>
    </div>
    <div id="type">
        <span style="color: silver" class="left">选择</span>
        <ul>
            <li class="clearfix">
                <a>
                    <span class="left">${species[0]}</span>
                </a>
            </li>
            <li class="clearfix">
                <a>
                    <span class="left">${species[1]}</span>
                </a>
            </li>
        </ul>
    </div>
</div>
</body>`
}

module.exports = viewtemplate;