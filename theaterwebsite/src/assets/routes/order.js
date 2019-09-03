// 主頁面產品列表
const express = require('express');
const pool = require('../js/pool');
let router = express.Router();
module.exports = router;
//傳送訂單頁面
router.post('/', (req, res) => {
    // console.log(req.body);
    let name = req.body.data.user.name;
    let email = req.body.data.user.email;
    let tel = req.body.data.user.tel;
    let address = req.body.data.user.address;
    let orderitem = "";
    let account = req.query.account;
    // console.log("account", account);
    // 訂購項目資訊
    for (var index = 0; index < req.body.data.item.length; index++) {
        orderitem += ` ${req.body.data.item[index]} x ${req.body.data.quantity[index]} `;
    }
    let message = req.body.data.message;
    let ispaid = 0;
    let eachtotal = String(req.body.data.eachtotal);
    let totalprice = req.body.data.totalprice;
    let subscriber = req.body.data.subscriber;
    // console.log("eachtotal", eachtotal);
    // console.log("account123", account);
    if (account !== "null") {
        pool.getConnection((err, conn) => {
            // 如果連接有誤則拋出錯誤x
            if (err)
                throw err.message;
            //創建sql語句
            //向database發送sql語句並獲取返回結果
            // 插入資料
            let sql = `INSERT INTO ordercart(uname,email,tel,address,orderitem,ispaid,message,totalprice,account,eachtotal) VALUES (?,?,?,?,?,?,?,?,?,?)`;
            conn.query(sql, [name, email, tel, address, orderitem, ispaid, message, totalprice, subscriber, eachtotal], (err, result) => {
                if (err)
                    throw err.message;
                if (result) {
                    // console.log(result);
                    res.json("success");
                }
                // 釋放連接
                conn.release();
            });
        });
    } else {
        res.json(false);
    }

})
//訂單頁面
router.get('/checkout', (req, res) => {
    // console.log('query', req.query);
    // res.send(true);
    let account = req.query.account;
    if (account !== "null") {
        pool.getConnection((err, conn) => {
            // 如果連接有誤則拋出錯誤
            if (err)
                throw err.message;
            //創建sql語句
            //向database發送sql語句並獲取返回結果
            // 資料插入之前先SELECT檢查一下=>檢查account,email,phone
            let sql = `SELECT * FROM ordercart WHERE account=?`;
            let tempstr = "";
            let orderitem = [];
            let orderinfo = {
                item: [],
                quantity: [],
                eachtotal: [],
                totalprice: 0
            };
            // 目前只會顯示最新一筆訂單
            conn.query(sql, [account], (err, result) => {
                if (err)
                    throw err.message;
                // 如果有長度代表已經有資料
                // 空陣列還是為true,所以使用len判斷
                console.log(result);
                if (result.length > 0) {
                    // 切割字串
                    tempstr = result[result.length - 1].orderitem.trim();
                    //清除最後一個元素,最後一個元素只有數字
                    // console.log('new', tempstr);
                    // 依據x切割
                    orderitem = tempstr.split('x');
                    //將只有數字的元素清除
                    orderitem.pop();
                    orderitem.forEach((item, index) => {
                        //將裡面的數字以及空白清除掉取得購買項目
                        orderinfo.item[index] = item.replace(/\d/g, "").trim();
                    });
                    // 清除空白
                    tempstr = tempstr.replace(/\s/g, "");
                    // indexOf搜尋用下標
                    let quantitypos = 0;
                    orderinfo.item.forEach((item, index) => {
                        // 取得每個x所在的位置
                        quantitypos = tempstr.indexOf("x", quantitypos + 1);
                        // 取得x後面的購買數字
                        orderinfo.quantity[index] = Number(tempstr.charAt(quantitypos + 1));
                    });
                    // 個別總價
                    orderinfo.eachtotal = result[result.length - 1].eachtotal.split(",");
                    // 總價
                    orderinfo.totalprice = result[result.length - 1].totalprice;
                    // console.log("tempstr", tempstr);
                    // console.log('process', orderinfo.item);
                    // console.log('process2', orderinfo.quantity);
                    // console.log('process3', orderinfo.totalprice);
                    // console.log('process4', orderinfo.eachtotal);
                    // console.log("result[0].ispaid",result[0].ispaid);
                    res.json({ name: result[result.length - 1].uname, email: result[result.length - 1].email, tel: result[result.length - 1].tel, address: result[result.length - 1].address, ispaid: result[result.length - 1].ispaid, item: orderinfo.item, quantity: orderinfo.quantity, totalprice: orderinfo.totalprice, eachtotal: orderinfo.eachtotal });
                } else {
                    res.send(false);
                }
                //釋放連接
                conn.release();
            });
        });
    } else {
        res.send(false);
    }
})
// 付款
router.post('/pay', (req, res) => {
    // console.log('body', req.body);
    // res.send(true);
    console.log("/pay");
    let account = req.body.account;
    let ispaid = req.body.ispaid;
    // console.log("account789", account);
    if (account !== "null") {
        pool.getConnection((err, conn) => {
            // 如果連接有誤則拋出錯誤
            if (err)
                throw err.message;
            //創建sql語句
            //向database發送sql語句並獲取返回結果
            // console.log(account, ispaid);
            // 更改付款資訊=>已付款
            let sql = `UPDATE ordercart SET ispaid=? WHERE account=?`;
            conn.query(sql, [ispaid, account], (err, result) => {
                if (err)
                    throw err.message;
                // 如果有長度代表已經有資料
                if (result.affectedRows > 0) {
                    res.send(true);
                } else {
                    res.send(false);
                }
                //釋放連接
                conn.release();
            });
        });
    } else {
        res.send(false);
    }
})