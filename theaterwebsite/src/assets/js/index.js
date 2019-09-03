/*项目入口文件 */
const http = require('http');
const express = require('express');

/******Server******/
let port = 8000;
let app = express();
// 創建http Server並且監聽8080端口
http.createServer(app).listen(port, () => {
    console.log('Server listening PORT ' + port);
});

// /******中間件******/
// 當請求為post時可透過bodyParser從req.body取得post訊息
const bodyParser = require("body-parser");
// 當有cookie時可透過cookieParser從req.cookies取得post訊息
const cookieParser = require('cookie-parser');
// 透過cors去做跨域請求
const cors = require('cors');
app.use(bodyParser.urlencoded({
    extended: false  //是否使用第三方模組qs來解析請求主體,false為使用原生queryString,true為使用第三方qs
}));  //请求主体被封装到req.body属性中
// 解析json,加上bodyParser.json解析post的json物件,不然回傳值會為空值
app.use(bodyParser.json());
app.use(cookieParser());  //request header中的Cookie封装到req.cookies属性中
app.use(cors({
    origin: '*',    //控制響應頭Access-Control-Allow-Origin
    credentials: true //控制響應頭Access-Control-Allow-Credentials,允許請求攜帶cookie
})); //设置需要的響應消息頭部，以允许客户端的跨域请求
// 主頁面
app.use('/homepage', require('../routes/product'));
// 登入、註冊
app.use('/user', require('../routes/user'));
// 訂單
app.use('/order', require('../routes/order'));