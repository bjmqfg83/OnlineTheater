// user註冊登入
const express = require('express');
const pool = require('../js/pool');
let router = express.Router();
module.exports = router;
// 登入驗證
router.get('/login', (req, res) => {
    // console.log(req.query);
    // console.log(req);
    let n = req.query.uname;
    let p = req.query.upwd;
    pool.getConnection((err, conn) => {
        // 如果連接有誤則拋出錯誤
        if (err)
            throw err.message;
        //創建sql語句
        //向database發送sql語句並獲取返回結果
        let sql = "SELECT realname from member WHERE uname=? AND upwd=?";
        conn.query(sql, [n, p], (err, result) => {
            if (err)
                throw err.message;
            if (result) {
                res.send(result);
            }
            //釋放連接
            conn.release();
        });
    });
})
// 註冊
router.post('/register', (req, res) => {
    // console.log('body', req.body);
    pool.getConnection((err, conn) => {
        // 如果連接有誤則拋出錯誤
        if (err)
            throw err.message;
        //創建sql語句
        //向database發送sql語句並獲取返回結果
        let rn = req.body.realName;
        let n = req.body.account;
        let p = req.body.password;
        let m = req.body.email;
        let ph = parseInt(req.body.phone);
        let g = parseInt(req.body.gender);
        // 資料插入之前先SELECT檢查一下=>檢查account,email,phone
        let sql = `SELECT id FROM member WHERE uname=? AND email=? AND phone=?`;
        conn.query(sql, [n, m, ph], (err, result) => {
            if (err)
                throw err.message;
            // console.log(result.length);
            // 如果有長度代表已經有資料
            if (result.length==0) {
                // 如果無該資料則插入新的資料
                let sql2 = `INSERT INTO member(realname,uname,upwd,email,phone,gender) VALUES(?,?,?,?,?,?)`;
                conn.query(sql2, [rn, n, p, m, ph, g], (err, result) => {
                    if (err)
                        throw err.message;
                        // 創建成功回傳true
                    if (result) {
                        // res.send(true);
                        res.send(true);
                    }
                });
                // 創建失敗則回傳false,false表示資料重複
            } else {
                res.send(false);
            }
            //釋放連接
            conn.release();
        });
    });
})
